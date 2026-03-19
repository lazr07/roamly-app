// Tests that the AssetCard renders asset data correctly

import { render, screen } from '@testing-library/react'
import AssetCard from '@/components/AssetCard'

const mockAsset = {
  id: 'test-id-123',
  title: 'St Ives Beach',
  description: 'A beautiful sandy beach in West Cornwall.',
  location: 'St Ives, Cornwall',
  image_url: 'https://example.com/image.jpg',
  categories: { name: 'Beach', icon: '🏖️' },
  avg_rating: 4.5,
}

describe('AssetCard Component', () => {
  it('renders the asset title', () => {
    render(<AssetCard asset={mockAsset} />)
    expect(screen.getByText('St Ives Beach')).toBeInTheDocument()
  })

  it('renders the location', () => {
    render(<AssetCard asset={mockAsset} />)
    expect(screen.getByText(/St Ives, Cornwall/i)).toBeInTheDocument()
  })

  it('renders the category name', () => {
   render(<AssetCard asset={mockAsset} />)
   expect(screen.getByText(/🏖️/)).toBeInTheDocument()
  })

  it('renders the average rating', () => {
    render(<AssetCard asset={mockAsset} />)
    expect(screen.getByText(/4.5/i)).toBeInTheDocument()
  })

  it('renders a link to the correct asset page', () => {
    render(<AssetCard asset={mockAsset} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/assets/test-id-123')
  })
})
