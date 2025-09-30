import { cn } from "@/utils/cn";
import { Button, Stepper } from "@mantine/core";
import { stepActions, stepStore$ } from "@/components/editor/step-store";
import { use$ } from "@legendapp/state/react";

export function EditorHeader() {
  return (
    <div className={
      cn(
        'sticky top-0 z-50',
        'flex flex-col gap-2 ',
        'py-2 bg-zinc-50 border-b border-zinc-200 shadow-xs',
      )
    }>
      <h1>Editor Header</h1>


      <Steps />

      <div>
        <Button variant="default" onClick={() => stepActions.next()}>Back</Button>
        <Button onClick={() => stepActions.prev()}>Next step</Button>
      </div>
    </div>
  )
}


function Steps() {
  const steps = use$(stepStore$.steps)
  const current = use$(stepStore$.current)
  return (
    <Stepper active={current} onStepClick={(e) => {
      console.log(e)
    }} >
      {
        steps.map((step,) => {
          return (
            <Stepper.Step key={step.id} label={step.name} description={step.description}>
              {step.name}
            </Stepper.Step>
          )
        })
      }

    </Stepper>
  )
}