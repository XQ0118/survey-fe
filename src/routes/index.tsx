import { TemplateRadio } from '@/components/template/radio'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <TemplateRadio />
  </div>
}
