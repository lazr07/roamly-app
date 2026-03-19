'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SubmitPage() {
  const supabase = createClient()
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category_id: '',
    image_url: '',
    lat: '',
    lng: ''
  })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/sign-in')
    })
    supabase.from('categories').select('*').then(({ data }) => setCategories(data || []))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('assets').insert({
      title: form.title,
      description: form.description,
      location: form.location,
      category_id: form.category_id,
      image_url: form.image_url,
      lat: form.lat ? parseFloat(form.lat) : null,
      lng: form.lng ? parseFloat(form.lng) : null,
      submitted_by: user?.id,
      status: 'pending',
    })
    if (!error) {
      setSuccess(true)
    }
  }

  if (success) return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <p className="text-4xl">🎉</p>
      <h2 className="text-2xl font-bold mt-4">Submission received!</h2>
      <p className="text-gray-500 mt-2">
        You earned <strong>+10 points</strong>. Your place is pending admin approval.
      </p>
      <button
        onClick={() => router.push('/')}
        className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
      >
        Back to Browse
      </button>
    </div>
  )

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📍 Add a New Place</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            required
            placeholder="e.g. St Ives, Cornwall"
            value={form.location}
            onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Lat / Lng */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              step="any"
              placeholder="e.g. 50.1172"
              value={form.lat}
              onChange={e => setForm(prev => ({ ...prev, lat: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              step="any"
              placeholder="e.g. -5.5152"
              value={form.lng}
              onChange={e => setForm(prev => ({ ...prev, lng: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 -mt-2">
          💡 Find coordinates by right-clicking any location on{' '}
          <a
            href="https://maps.google.com"
            target="_blank"
            className="text-emerald-600 underline"
          >
            Google Maps
          </a>
        </p>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            required
            placeholder="https://..."
            value={form.image_url}
            onChange={e => setForm(prev => ({ ...prev, image_url: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            required
            value={form.category_id}
            onChange={e => setForm(prev => ({ ...prev, category_id: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">Select category...</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            rows={4}
            placeholder="Describe this place..."
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          Submit Place
        </button>

      </form>
    </main>
  )
}
