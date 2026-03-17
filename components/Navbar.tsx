import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="bg-emerald-700 text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold tracking-tight">
        🗺️ VisitLocal
      </Link>
      <div className="flex gap-6 items-center text-sm font-medium">
        <Link href="/" className="hover:underline">Browse</Link>
        {user ? (
          <>
            <Link href="/submit" className="hover:underline">Add Place</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
            <form action="/auth/signout" method="post">
              <button className="bg-white text-emerald-700 px-3 py-1 rounded hover:bg-gray-100">
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <Link href="/sign-in" className="bg-white text-emerald-700 px-3 py-1 rounded hover:bg-gray-100">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
