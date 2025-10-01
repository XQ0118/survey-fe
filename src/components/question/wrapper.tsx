import { cn } from "@/utils/cn";
import { ActionIcon } from "@mantine/core";
import { CaretDownIcon, CaretUpIcon, TrashIcon, } from "@phosphor-icons/react";
import { coreQuestionActions, infoQuestionActions } from "@/components/editor/store/editor-store";

export function QuestionWrapper(props: {
  id: string;
  type: 'core' | 'info'|string;
  children: React.ReactNode;
}) {
  const { id, children, type } = props;
  return (
    <div className={
      cn(
        'group',
        'flex gap-2',
        'py-4 border-b border-zinc-200 last:border-b-0'
      )
    }>
      {children}

      <Actions className="group-hover:opacity-100 opacity-0" id={id} type={type} />
    </div>
  )
}

function Actions(props: {
  className?: string;
  id: string;
  type: 'core' | 'info'|string;
}) {
  const { className, id,type } = props;
 function handleMoveUp() {
  if (type === 'core') {
    coreQuestionActions.moveUp(id)
  } else {
    infoQuestionActions.moveUp(id)
  }
 }

 function handleMoveDown() {
  if (type === 'core') {
    coreQuestionActions.moveDown(id)
  } else {
    infoQuestionActions.moveDown(id)
  }
 }

 function handleRemove() {
  if (type === 'core') {
    coreQuestionActions.removeQuestion(id)
  } else {
    infoQuestionActions.removeQuestion(id)
  }
 }
 
  return (
    <div className={
      cn(
        'flex flex-col gap-2',
        'animate-in fade-in-0 duration-300',
        className,
      )
    }>
      <ActionIcon variant='default' aria-label="move up" onClick={handleMoveUp}>
        <CaretUpIcon />
      </ActionIcon>

      <ActionIcon variant="default" aria-label="move down" onClick={handleMoveDown  }>
        <CaretDownIcon />
      </ActionIcon>

      <ActionIcon variant="outline" color="red" aria-label="remove" onClick={handleRemove}>
        <TrashIcon />
      </ActionIcon>
    </div>
  )
}
