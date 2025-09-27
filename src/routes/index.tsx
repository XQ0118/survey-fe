import { EditorContainer } from '@/components/editor/container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <EditorContainer/>
  </div>
}
