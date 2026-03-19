'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AssetCard from '@/components/AssetCard'
import CategoryFilter from '@/components/CategoryFilter'
import dynamic from 'next/dynamic'

// Dynamically import map to prevent SSR issues
const AssetMap = dynamic(() => import('@/components/AssetMap'), { ssr: false })

export default function HomePage() {
  const supabase = createClient()
  const [assets, setAssets] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'map'>('grid')

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => {
      if (data) setCategories(data)
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    let query = supabase
      .from('assets')
      .select('*, categories(name, icon)')
      .eq('status', 'approved')

    if (selectedCategory) query = query.eq('category_id', selectedCategory)
    if (search) query = query.ilike('title', `%${search}%`)

    query.then(({ data }) => {
      setAssets(data || [])
      setLoading(false)
    })
  }, [selectedCategory, search])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Discover Hidden Gems</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Community-curated tourist spots — beaches, heritage, nightlife and more
        </p>
        <input
          type="text"
          placeholder="Search places..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mt-4 w-full max-w-md border border-gray-300 rounded-full px-5 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* Filters + View Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Grid / Map toggle buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              view === 'grid'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ☰ Grid
          </button>
          <button
            onClick={() => setView('map')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              view === 'map'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🗺️ Map
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-400 mt-12">Loading places...</p>
      ) : assets.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">No places found.</p>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {assets.map(asset => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <AssetMap assets={assets} />
          <p className="text-xs text-gray-400 mt-2 text-center">
            Click a marker to view place details. Only places with coordinates appear on the map.
          </p>
        </div>
      )}
    </main>
  )
}
