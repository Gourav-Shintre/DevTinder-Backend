import { Outlet } from 'react-router'
import { Navbar } from './Navbar'

/** Layout for logged-in pages: navbar on top, page content below. */
export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
