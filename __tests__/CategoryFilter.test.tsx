// Tests that CategoryFilter renders categories and triggers onChange correctly

import { render, screen, fireEvent } from '@testing-library/react'
import CategoryFilter from '@/components/CategoryFilter'

const mockCategories = [
  { id: '1', name: 'Beach', icon: '🏖️' },
  { id: '2', name: 'Heritage', icon: '🏛️' },
]

describe('CategoryFilter Component', () => {
  it('renders an "All" button', () => {
    render(<CategoryFilter categories={mockCategories} selected="" onChange={() => {}} />)
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('renders all category buttons', () => {
    render(<CategoryFilter categories={mockCategories} selected="" onChange={() => {}} />)
    expect(screen.getByText(/Beach/i)).toBeInTheDocument()
    expect(screen.getByText(/Heritage/i)).toBeInTheDocument()
  })

  it('calls onChange with empty string when All is clicked', () => {
    const mockChange = jest.fn()
    render(<CategoryFilter categories={mockCategories} selected="" onChange={mockChange} />)
    fireEvent.click(screen.getByText('All'))
    expect(mockChange).toHaveBeenCalledWith('')
  })

  it('calls onChange with category id when a category is clicked', () => {
    const mockChange = jest.fn()
    render(<CategoryFilter categories={mockCategories} selected="" onChange={mockChange} />)
    fireEvent.click(screen.getByText(/Beach/i))
    expect(mockChange).toHaveBeenCalledWith('1')
  })
})
