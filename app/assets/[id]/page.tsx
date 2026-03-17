'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import StarRating from '@/components/StarRating'
import { useParams } from 'next/navigation'

export default function AssetDetailPage() {
  const { id } = useParams()
  const supabase = createClient()
  const [asset, setAsset] = useState<any>(null)
  const [ratings, setRatings] = useState<any[]>([])
  const [comment, setComment] = useState('')
  const [userRating, setUserRating] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    supabase.from('assets').select('*, categories(name, icon)').eq('id', id).single()
      .then(({ data }) => setAsset(data))
    supabase.from('ratings').select('*').eq('asset_id', id)
      .then(({ data }) => setRatings(data || []))
  }, [id])

  const avgRating = ratings.length
    ? (ratings.reduce((s, r) => s + r.score, 0) / ratings.length).toFixed(1)
    : null

  const handleSubmitRating = async () => {
    if (!user || !userRating) return
    const { error } = await supabase.from('ratings').insert({
      asset_id: id,
      user_id: user.id,
      score: userRating,
      comment,
    })
    if (!error) {
      setSubmitted(true)
      setRatings(prev => [...prev, { score: userRating, comment, user_id: user.id }])
    }
  }

  if (!asset) return <p className="text-center mt-12 text-gray-400">Loading...</p>

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <img src={asset.image_url} alt={asset.title} className="w-full h-72 object-cover rounded-2xl mb-6" />
      <div className="flex items-center gap-3 mb-2">
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
          {asset.categories?.icon} {asset.categories?.name}
        </span>
        {avgRating && <span className="text-yellow-500 font-bold">★ {avgRating} ({ratings.length} reviews)</span>}
      </div>
      <h1 className="text-3xl font-bold text-gray-800">{asset.title}</h1>
      <p className="text-gray-400 mt-1">📍 {asset.location}</p>
      <p className="text-gray-600 mt-4 text-base leading-relaxed">{asset.description}</p>

      {/* Rating Section */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {ratings.map((r, i) => (
          <div key={i} className="mb-3 bg-gray-50 p-3 rounded-lg">
            <div className="text-yellow-400">{'★'.repeat(r.score)}{'☆'.repeat(5 - r.score)}</div>
            {r.comment && <p className="text-gray-600 text-sm mt-1">{r.comment}</p>}
          </div>
        ))}

        {user && !submitted ? (
          <div className="mt-4 bg-emerald-50 p-4 rounded-xl">
            <p className="font-medium mb-2">Leave a Review</p>
            <StarRating onRate={setUserRating} current={userRating} />
            <textarea
              className="mt-3 w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              rows={3}
              placeholder="Share your experience..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button
              onClick={handleSubmitRating}
              disabled={!userRating}
              className="mt-2 bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-emerald-700 disabled:opacity-50"
            >
              Submit Review
            </button>
          </div>
        ) : !user ? (
          <p className="text-sm text-gray-400 mt-4">
            <a href="/sign-in" className="text-emerald-600 underline">Sign in</a> to leave a review.
          </p>
        ) : (
          <p className="text-sm text-emerald-600 mt-4">✅ Thanks for your review!</p>
        )}
      </div>
    </main>
  )
}
