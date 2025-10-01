import { Textarea, } from "@mantine/core";
import { cn } from "@/utils/cn";
import type { Observable } from "@legendapp/state";
import { XIcon } from "@phosphor-icons/react";
import { use$ } from "@legendapp/state/react";
import type { IInputQuestionSchema } from "@/interface/question/input";
import { useRef } from "react";
import { getCoreQuestionPlaceholder, getInfoQuestionPlaceholder } from "@/components/editor/store/editor-store";

export function InputQuestion(props: {
  index: number;
  type: 'core' | 'info' | string;
  schema$: Observable<IInputQuestionSchema>;
}) {
  const { index, type, schema$ } = props;
  const placeholder = useRef(type === 'core' ? getCoreQuestionPlaceholder() : getInfoQuestionPlaceholder())

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
        placeholder={placeholder.current}
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
  placeholder: string;
  question$: Observable<string>;
}) {
  const { index, placeholder, question$ } = props;
  const questionValue = use$(question$);

  return (
    <Textarea
      label={`${index + 1} 题目`}
      withAsterisk
      // description="请输入问题"
      placeholder={placeholder ?? '默认问题'}
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
