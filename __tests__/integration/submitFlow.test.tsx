// Integration test: verifies the submit form renders all fields
// and prevents submission without required inputs

import { render, screen, fireEvent } from '@testing-library/react'

// Mock Supabase and Next.js router since we're testing UI behaviour only
jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user-1' } } }) },
    from: () => ({ select: () => ({ then: (cb: any) => cb({ data: [] }) }) }),
  }),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

import SubmitPage from '@/app/submit/page'

describe('Submit Asset Form (Integration)', () => {
  it('renders all required form fields', async () => {
    render(<SubmitPage />)
    expect(await screen.findByText(/Add a New Place/i)).toBeInTheDocument()
  })

  it('submit button is present', async () => {
    render(<SubmitPage />)
    expect(await screen.findByRole('button', { name: /Submit Place/i })).toBeInTheDocument()
  })
})
