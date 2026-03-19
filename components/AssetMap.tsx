'use client'
import { useEffect } from 'react'

interface Asset {
  id: string
  title: string
  location: string
  lat: number
  lng: number
  categories: { name: string; icon: string }
}

interface Props {
  assets: Asset[]
}

export default function AssetMap({ assets }: Props) {
  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = (await import('leaflet')).default

      // Fix default marker icon broken by Webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Prevent re-initialising if map already exists
      const container = document.getElementById('roamly-map') as any
      if (container && container._leaflet_id) return

      // Filter assets that have coordinates
      const mappableAssets = assets.filter(a => a.lat && a.lng)
      if (mappableAssets.length === 0) return

      // Centre map on first asset
      const map = L.map('roamly-map').setView(
        [mappableAssets[0].lat, mappableAssets[0].lng],
        10
      )

      // Add OpenStreetMap tiles (free, open source)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Add a marker for each asset
      mappableAssets.forEach(asset => {
        const popup = `
          <div style="min-width:150px">
            <strong>${asset.categories?.icon} ${asset.title}</strong><br/>
            <span style="color:#6b7280;font-size:12px">📍 ${asset.location}</span><br/>
            <a href="/assets/${asset.id}" 
               style="color:#059669;font-size:12px;font-weight:600;">
              View details →
            </a>
          </div>
        `
        L.marker([asset.lat, asset.lng])
          .addTo(map)
          .bindPopup(popup)
      })
    }

    initMap()

    // Cleanup on unmount
    return () => {
      const container = document.getElementById('roamly-map') as any
      if (container && container._leaflet_id) {
        container._leaflet_id = null
      }
    }
  }, [assets])

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        id="roamly-map"
        className="w-full rounded-xl overflow-hidden shadow-md"
        style={{ height: '420px', zIndex: 0 }}
      />
    </>
  )
}
