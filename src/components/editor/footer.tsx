import { cn } from "@/utils/cn";
import { Button } from "@mantine/core";
import { stepActions, stepStore$ } from "./store/step-store";
import { use$ } from "@legendapp/state/react";

export function EditorFooter() {
  const current = use$(stepStore$.current)
  const steps = use$(stepStore$.steps)
  const isCompleted = use$(stepStore$.isCompleted)

  const isLastStep = current === steps.length - 1

  return (
    <div className={
      cn(
        'sticky bottom-0 z-50',
        'flex flex-col gap-2 ',
        'p-2 bg-zinc-50 border-b border-zinc-200 shadow-xs',
      )
    }>
      <div className="flex justify-center gap-2">
        <Button variant="default" onClick={() => stepActions.prev()}>上一步</Button>
        {
          isCompleted
            ? null
            : (
              isLastStep
                ?  <Button onClick={() => stepActions.next()}>完成</Button> 
                :<Button onClick={() => stepActions.next()}>下一步</Button>
            )
        }
      </div>

    </div>
  )
}
