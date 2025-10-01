import { cn } from "@/utils/cn";
import { Button } from "@mantine/core";
import { PlusIcon } from "@phosphor-icons/react";
import { coreQuestionActions, infoQuestionActions } from "@/components/editor/store/editor-store";
import { use$ } from "@legendapp/state/react";
import { stepStore$ } from "@/components/editor/store/step-store";
import type { TSchemaType } from "@/interface/question/schema";

export function EditorAside() {
  const isCompleted = use$(stepStore$.isCompleted)
  const currentStep = use$(stepStore$.currentStep)

  function handleAddQuestion(type: TSchemaType) {
    if (currentStep?.value === 'core') {
      coreQuestionActions.addQuestion(type)
    } else if (currentStep?.value === 'info') {
      infoQuestionActions.addQuestion(type)
    }
  }

  const isDescriptionStep = currentStep?.value === 'description'
  const disabled = isCompleted || isDescriptionStep

  console.log("currentStep:", currentStep)
  return (
    <div className={
      cn(
        'w-48',
        'py-3',
        'border-r-[0.5px] border-zinc-200 shadow-xs'
      )
    }>
      <h1 className="text-sm font-medium mb-2">题型</h1>

      <div className="w-fit flex flex-col gap-2">
        <Button className="w-fit"
          disabled={disabled}
          leftSection={<PlusIcon />}
          onClick={() => {
            handleAddQuestion('radio')
          }}
        >
          单选题
        </Button>

        <Button className="w-fit"
          disabled={disabled}
          leftSection={<PlusIcon />}
          onClick={() => {
            handleAddQuestion('input')
          }}
        >
          填空题
        </Button>
      </div>
    </div>
  )
}
