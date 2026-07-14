import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <main className="p-8 text-2xl">MTG Collection Visualizer</main>
}
