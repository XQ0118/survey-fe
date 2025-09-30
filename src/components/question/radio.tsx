import { ActionIcon, TextInput } from "@mantine/core";
import { useCallback, } from "react";
import { PlusIcon, CaretUpIcon, CaretDownIcon, XIcon, TrashIcon } from "@phosphor-icons/react";
import { nanoid } from "nanoid";
import type { IRadioOption, IRadioQuestionSchema } from "@/interface/question/radio";
import { cn } from "@/utils/cn";
import type { Observable } from "@legendapp/state";
import { Memo, use$ } from "@legendapp/state/react";

export function RadioQuestion(props: {
  index: number;
  schema$: Observable<IRadioQuestionSchema>;
}) {
  const { index, schema$ } = props;

  const handleAddOption = useCallback((index: number) => {
    const options = schema$.options.peek()
    if(options.length >= 99) return;
    const addIndex = index + 1

    const newOptions = {
      id: nanoid(),
      value: `选项${options.length + 1}`,
    }

    schema$.options.splice(addIndex, 0, newOptions)
  }, [])

  const handleRemoveOption = useCallback((id: string) => {
    const options = schema$.options.peek()
    const index = options.findIndex(option => option.id === id)

    if (options.length <= 1) return; // 至少保留一个选项

    schema$.options.splice(index, 1);
  }, [])

  const handleUpOption = useCallback((id: string) => {
    const options = schema$.options.peek()
    const index = options.findIndex(option => option.id === id)

    if (index <= 0) return; // 同时处理了 -1 和 0 的情况
    console.log("handleUpOption:", index, id)
    const newOptions = [...options];
    [newOptions[index], newOptions[index - 1]] = [newOptions[index - 1], newOptions[index]];
    schema$.options.set(newOptions);

  }, [])

  const handleDownOption = useCallback((id: string) => {
    const options = schema$.options.peek()
    const index = options.findIndex(option => option.id === id)

    if (index < 0 || index === options.length - 1) return; // 同时处理找不到和已是最后的情况
    console.log("handleDownOption:", index, id)
    const newOptions = [...options];
    [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
    schema$.options.set(newOptions);
  }, [])

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


      <div className={
        cn(
          'max-w-md',
          'flex flex-col gap-2'
        )
      }>
        <Memo>
          {
            () => {
              return schema$.options.map((option$, index) => {
                // 不要在遍历中使用 get 会触发多余依赖，影响性能
                return (
                  <OptionInput
                    key={option$.peek().id}// ✅ peek 不会触发追踪
                    index={index}
                    option$={option$}
                    handleAddOption={handleAddOption}
                    handleRemoveOption={handleRemoveOption}
                    handleUpOption={handleUpOption}
                    handleDownOption={handleDownOption}
                  />
                )
              })
            }
          }
        </Memo>
      </div>

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
    <TextInput
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

function OptionInput(props: {
  index: number,
  option$: Observable<IRadioOption>;
  handleAddOption: (index: number) => void;
  handleRemoveOption: (id: string) => void;
  handleUpOption: (id: string) => void;
  handleDownOption: (id: string) => void;
}) {
  const { index, option$, handleAddOption, handleRemoveOption, handleUpOption, handleDownOption } = props;

  // console.log("option$.value.get()", option$.value.get())

  const optionValue = use$(option$.value);
  const optionId = use$(option$.id);
  return (
    <div className="flex items-center gap-2">
      <strong className="shrink-0 w-5 text-right">{index + 1}</strong>
      
      <TextInput
        size="xs"
        placeholder={`选项`}
        value={optionValue}
        onChange={(e) => { option$.value.set(e.target.value.trim()) }}
        rightSection={optionValue && (
          <XIcon
            style={{ cursor: 'pointer' }}
            onClick={() => { option$.value.set('') }}
          />
        )}
        rightSectionPointerEvents="auto"
      />

      <div className="flex items-center gap-2">
        <ActionIcon variant="light" aria-label="Settings" onClick={() => handleUpOption(optionId)}>
          <CaretUpIcon />
        </ActionIcon>

        <ActionIcon variant="light" aria-label="Settings" onClick={() => handleDownOption(optionId)}>
          <CaretDownIcon />
        </ActionIcon>

        <ActionIcon variant="light" aria-label="Settings" onClick={() => handleAddOption(index)}>
          <PlusIcon />
        </ActionIcon>
        <ActionIcon variant="light" color="red" aria-label="Settings" onClick={() => handleRemoveOption(optionId)}>
          <TrashIcon />
        </ActionIcon>
      </div>
    </div>
  )
}
