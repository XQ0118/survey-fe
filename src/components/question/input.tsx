import { Textarea,  } from "@mantine/core";
import { cn } from "@/utils/cn";
import type { Observable } from "@legendapp/state";
import { XIcon } from "@phosphor-icons/react";
import { use$ } from "@legendapp/state/react";
import type { IInputQuestionSchema } from "@/interface/question/input";

export function InputQuestion(props: {
  index: number;
  schema$: Observable<IInputQuestionSchema>;
}) {
  const { index, schema$ } = props;
  return (
    <div className={
      cn(
        'max-w-md',
        'flex flex-col gap-2.5',
        'bg-zinc-50 p-2 rounded border-[0.5px] border-zinc-200 shadow-xs',

      )
    }>

      <QuestionInput
        index={index}
        question$={schema$.question}
      />

      <Textarea
        placeholder="答案框"
        readOnly
        disabled
      />
    </div>
  )
}


function QuestionInput(props: {
  index: number,
  question$: Observable<string>;
}) {
  const { index, question$ } = props;
  const questionValue = use$(question$);

  return (
    <Textarea
      label={`${index + 1} 题目`}
      withAsterisk
      description="请输入问题"
      placeholder="问题"
      value={questionValue}
      onChange={(e) => { question$.set(e.target.value.trim()) }}
      rightSection={questionValue && (
        <XIcon
          style={{ cursor: 'pointer' }}
          onClick={() => { question$.set('') }}
        />
      )}
      rightSectionPointerEvents="auto"
    />
  )
}
