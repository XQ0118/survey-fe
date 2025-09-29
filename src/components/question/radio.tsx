import { ActionIcon, TextInput } from "@mantine/core";
import { useCallback, } from "react";
import { PlusIcon, MinusIcon, CaretUpIcon, CaretDownIcon } from "@phosphor-icons/react";
import { nanoid } from "nanoid";
import type { IRadioOption, IRadioQuestionSchema } from "@/interface/question/radio";
import { cn } from "@/utils/cn";
import type { Observable } from "@legendapp/state";
import { Memo, use$ } from "@legendapp/state/react";

export function RadioQuestion(props: {
  index?: string;
  schema$: Observable<IRadioQuestionSchema>;
}) {
  const { index, schema$ } = props;
  console.log("index", index, schema$)

  // const question = use$(schema$.question)
  // console.log("question", question)
  const options = use$(schema$.options)

  const handleAddOption = useCallback((index: number) => {

    const addIndex = index + 1

    const newOptions = {
      id: nanoid(),
      value: `选项${options.length + 1}`,
    }

    schema$.options.splice(addIndex, 0, newOptions)
  }, [options])

  const handleRemoveOption = useCallback((index: number) => {
    if (options.length <= 1) return; // 至少保留一个选项
    schema$.options.splice(index, 1);
  }, [options])

  const handleUpOption = useCallback((index: number) => {
    if (index === 0) return;
    const currentOptions = schema$.options.get();
    const temp = currentOptions[index];
    schema$.options[index].set(currentOptions[index - 1]);
    schema$.options[index - 1].set(temp);
  }, [])

  const handleDownOption = useCallback((index: number) => {
    if (index === options.length - 1) return;
    const currentOptions = schema$.options.get();
    const temp = currentOptions[index];
    schema$.options[index].set(currentOptions[index + 1]);
    schema$.options[index + 1].set(temp);
  }, [options])

  return (
    <div className={
      cn(
        'max-w-md',
        'flex flex-col gap-2.5',
        'px-2 py-4 border-b border-zinc-200 last:border-b-0'
      )
    }>

      <TextInput
        label={`${1} 题目`}
        withAsterisk
        description="请输入问题"
        placeholder="问题"
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
              return schema$.options.map((option, index) => {
                const optionValue = option.get()
                return (
                  <OptionInput
                    key={optionValue.id}
                    index={index}
                    option={optionValue}
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

function OptionInput(props: {
  index: number,
  option: IRadioOption;
  handleAddOption: (index: number) => void;
  handleRemoveOption: (index: number) => void;
  handleUpOption: (index: number) => void;
  handleDownOption: (index: number) => void;
}) {
  const { index, option, handleAddOption, handleRemoveOption, handleUpOption, handleDownOption } = props;
  console.log("option", option)
  return (
    <div className="flex items-center gap-2">
      <strong>{index + 1}</strong>
      <TextInput
        size="xs"

        placeholder={`选项`}
        defaultValue={option.value}
      />
      <div className="flex items-center gap-2">
        <ActionIcon variant="filled" aria-label="Settings" onClick={() => handleUpOption(index)}>
          <CaretUpIcon />
        </ActionIcon>

        <ActionIcon variant="filled" aria-label="Settings" onClick={() => handleDownOption(index)}>
          <CaretDownIcon />
        </ActionIcon>

        <ActionIcon variant="filled" aria-label="Settings" onClick={() => handleAddOption(index)}>
          <PlusIcon />
        </ActionIcon>
        <ActionIcon variant="filled" aria-label="Settings" onClick={() => handleRemoveOption(index)}>
          <MinusIcon />
        </ActionIcon>
      </div>
    </div>
  )
}
