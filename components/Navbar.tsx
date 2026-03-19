'use client'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="bg-emerald-700 text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold tracking-tight">
        🗺️ Roamly
      </Link>
      <div className="flex gap-6 items-center text-sm font-medium">
        <Link href="/" className="hover:underline">Browse</Link>
        {user ? (
          <>
            <Link href="/submit" className="hover:underline">Add Place</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
            <button
              onClick={handleSignOut}
              className="bg-white text-emerald-700 px-3 py-1 rounded hover:bg-gray-100 font-medium"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/sign-in"
            className="bg-white text-emerald-700 px-3 py-1 rounded hover:bg-gray-100 font-medium"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
