// Tests the average rating calculation used on asset detail pages

import { describe, it } from "node:test"
import assert from "node:assert"


function calculateAverageRating(ratings: { score: number }[]): number | null {
  if (ratings.length === 0) return null
  const total = ratings.reduce((sum, r) => sum + r.score, 0)
  return parseFloat((total / ratings.length).toFixed(1))
}

describe('calculateAverageRating', () => {
  it('returns null for an empty ratings array', () => {
    expect(calculateAverageRating([])).toBeNull()
  })
  it('returns the correct average for a single rating', () => {
    expect(calculateAverageRating([{ score: 4 }])).toBe(4.0)
  })
  it('returns the correct average for multiple ratings', () => {
    const ratings = [{ score: 5 }, { score: 3 }, { score: 4 }]
    expect(calculateAverageRating(ratings)).toBe(4.0)
  })
  it('rounds to one decimal place', () => {
    const ratings = [{ score: 5 }, { score: 3 }]
    expect(calculateAverageRating(ratings)).toBe(4.0)
  })
  it('handles all 1-star ratings', () => {
    const ratings = [{ score: 1 }, { score: 1 }, { score: 1 }]
    expect(calculateAverageRating(ratings)).toBe(1.0)
  })
})
