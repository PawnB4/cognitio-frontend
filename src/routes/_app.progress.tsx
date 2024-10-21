import { createFileRoute } from '@tanstack/react-router'

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
