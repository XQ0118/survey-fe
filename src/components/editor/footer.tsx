import { cn } from "@/utils/cn";
import { Button } from "@mantine/core";
import { stepActions } from "./store/step-store";

export function EditorFooter() {  
  return (
    <div className={
      cn(
        'sticky bottom-0 z-50',
        'flex flex-col gap-2 ',
        'py-2 bg-zinc-50 border-b border-zinc-200 shadow-xs',
      )
    }>
      <h1>Editor Footer</h1>
      <div>
        <Button variant="default" onClick={() => stepActions.next()}>Back</Button>
        <Button onClick={() => stepActions.prev()}>Next step</Button>
      </div>
    </div>
  )
}
