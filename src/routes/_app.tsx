import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <>
      <nav className="h-20 bg-primary"></nav>
      <main className="grid grid-cols-12 min-h-screen">
        <aside className="col-span-2 bg-slate-400"></aside>
        <div className="col-start-3 col-end-12">
        <Outlet />
        </div>
      </main>
    </>
  )
}
