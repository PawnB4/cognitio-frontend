import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_app/progress')({
  component: Progress,
})

function Progress() {
  return (
    <div className="flex flex-col gap-14 w-96">
      <h1>Progress page</h1>
    </div>
  )
}
