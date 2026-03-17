import Link from 'next/link'

interface Asset {
  id: string
  title: string
  description: string
  location: string
  image_url: string
  categories: { name: string; icon: string }
  avg_rating?: number
}

export default function AssetCard({ asset }: { asset: Asset }) {
  return (
    <Link href={`/assets/${asset.id}`}>
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white cursor-pointer">
        <img
          src={asset.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'}
          alt={asset.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
              {asset.categories?.icon} {asset.categories?.name}
            </span>
            {asset.avg_rating && (
              <span className="text-yellow-500 font-semibold text-sm">
                ★ {Number(asset.avg_rating).toFixed(1)}
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-800 text-lg mt-1">{asset.title}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{asset.description}</p>
          <p className="text-gray-400 text-xs mt-2">📍 {asset.location}</p>
        </div>
      </div>
    </Link>
  )
}
