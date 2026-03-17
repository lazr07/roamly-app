'use client'
import { useState } from 'react'

interface Props {
  onRate: (score: number) => void
  current?: number
}

export default function StarRating({ onRate, current = 0 }: Props) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-colors"
        >
          <span className={star <= (hovered || current) ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        </button>
      ))}
    </div>
  )
}
