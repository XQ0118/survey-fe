import { cn } from "@/utils/cn";
import { Button } from "@mantine/core";
import { PlusIcon } from "@phosphor-icons/react";
import { questionActions } from "@/components/editor/editor-store";

export function EditorSide() {
  return (
    <div className={
      cn(
        'w-60',
        'border-r-[0.5px] border-zinc-200 shadow-xs'
      )
    }>
      <h1>Editor Side</h1>

      <div className="w-fit flex flex-col gap-2">
        <Button className="w-fit" leftSection={<PlusIcon />}
          onClick={() => {
            questionActions.addQuestion('radio')
          }}
        >
          单选题
        </Button>

        <Button className="w-fit" leftSection={<PlusIcon />}
          onClick={() => {
            questionActions.addQuestion('input')
          }}
        >
          填空题
        </Button>
      </div>
    </div>
  )
}
