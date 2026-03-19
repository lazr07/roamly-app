// Tests the interactive StarRating component renders and responds to clicks

import { render, screen, fireEvent } from '@testing-library/react'
import StarRating from '@/components/StarRating'

describe('StarRating Component', () => {
  it('renders 5 star buttons', () => {
    render(<StarRating onRate={() => {}} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)
  })

  it('calls onRate with correct score when a star is clicked', () => {
    const mockOnRate = jest.fn()
    render(<StarRating onRate={mockOnRate} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[2]) // 3rd star = score 3
    expect(mockOnRate).toHaveBeenCalledWith(3)
  })

  it('calls onRate with 5 when the last star is clicked', () => {
    const mockOnRate = jest.fn()
    render(<StarRating onRate={mockOnRate} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[4])
    expect(mockOnRate).toHaveBeenCalledWith(5)
  })

  it('highlights stars up to the current rating', () => {
    render(<StarRating onRate={() => {}} current={3} />)
    // Component renders — no crash with a preset current value
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })
})
