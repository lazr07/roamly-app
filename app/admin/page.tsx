'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminPage() {
  const supabase = createClient()
  const [pending, setPending] = useState<any[]>([])

  useEffect(() => {
    supabase.from('assets').select('*, categories(name, icon)')
      .eq('status', 'pending')
      .then(({ data }) => setPending(data || []))
  }, [])

  const moderate = async (id: string, status: 'approved' | 'rejected') => {
  const { error } = await supabase
    .from('assets')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Moderation failed:', error.message)
    alert('Error: ' + error.message)
    return
  }

  setPending(prev => prev.filter(a => a.id !== id))
}

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">🛡️ Admin — Pending Submissions</h1>
      {pending.length === 0 ? (
        <p className="text-gray-400">No pending submissions. All clear! ✅</p>
      ) : (
        <div className="space-y-4">
          {pending.map(asset => (
            <div key={asset.id} className="border rounded-xl p-4 flex gap-4 items-start">
              <img src={asset.image_url} className="w-28 h-20 object-cover rounded-lg" alt={asset.title} />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{asset.title}</h3>
                <p className="text-gray-400 text-sm">📍 {asset.location} · {asset.categories?.icon} {asset.categories?.name}</p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{asset.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => moderate(asset.id, 'approved')}
                  className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-emerald-700"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => moderate(asset.id, 'rejected')}
                  className="bg-red-100 text-red-600 px-4 py-1.5 rounded-lg text-sm hover:bg-red-200"
                >
                  ✗ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
