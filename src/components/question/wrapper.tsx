import { cn } from "@/utils/cn";
import { ActionIcon } from "@mantine/core";
import { CaretDownIcon, CaretUpIcon, TrashIcon, } from "@phosphor-icons/react";
import { questionActions } from "@/components/editor/editor-store";

export function QuestionWrapper(props: {
  id: string;
  children: React.ReactNode;
}) {
  const { id, children } = props;
  return (
    <div className={
      cn(
        'group',
        'flex gap-2',
        'py-4 border-b border-zinc-200 last:border-b-0'
      )
    }>
      {children}

      <Actions className="group-hover:opacity-100 opacity-0" id={id} />
    </div>
  )
}

function Actions(props: {
  className?: string;
  id: string;
}) {
  const { className, id } = props;
  console.log("id", id)
  return (
    <div className={
      cn(
        'flex flex-col gap-2',
        'animate-in fade-in-0 duration-300',
        className,
      )
    }>
      <ActionIcon variant='default' aria-label="move up" onClick={() => questionActions.moveUp(id)}>
        <CaretUpIcon />
      </ActionIcon>

      <ActionIcon variant="default" aria-label="move down" onClick={() => questionActions.moveDown(id)}>
        <CaretDownIcon />
      </ActionIcon>

      <ActionIcon variant="outline" color="red" aria-label="remove" onClick={() => questionActions.removeQuestion(id)}>
        <TrashIcon />
      </ActionIcon>
    </div>
  )
}