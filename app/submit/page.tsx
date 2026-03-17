'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SubmitPage() {
  const supabase = createClient()
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [form, setForm] = useState({
    title: '', description: '', location: '', category_id: '', image_url: ''
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
      ...form,
      submitted_by: user?.id,
      status: 'pending',
    })
    if (!error) {
      // Award points
      await supabase.rpc('increment_points', { user_id: user?.id, pts: 10 })
      setSuccess(true)
    }
  }

  if (success) return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <p className="text-4xl">🎉</p>
      <h2 className="text-2xl font-bold mt-4">Submission received!</h2>
      <p className="text-gray-500 mt-2">You earned <strong>+10 points</strong>. Your place is pending admin approval.</p>
      <button onClick={() => router.push('/')} className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-lg">
        Back to Browse
      </button>
    </div>
  )

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📍 Add a New Place</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Title', key: 'title', type: 'text' },
          { label: 'Location', key: 'location', type: 'text' },
          { label: 'Image URL', key: 'image_url', type: 'url' },
        ].map(({ label, key, type }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              required
              value={(form as any)[key]}
              onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        ))}
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <button type="submit" className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-700">
          Submit Place
        </button>
      </form>
    </main>
  )
}
