import { ActionIcon, Button, Group, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";
import { PlusIcon, MinusIcon, CaretUpIcon, CaretDownIcon } from "@phosphor-icons/react";
import { nanoid } from "nanoid";

export function TemplateRadio() {
  const [options, setOptions] = useState([
    {
      id: nanoid(),
      value: '',
    }
  ])

  const handleAddOption = useCallback((index: number) => {
    setOptions((prev) => {
      const addIndex = index + 1

      console.log("addIndex", addIndex, prev.length + 1)

      const newOptions = {
        id: nanoid(),
        value: `选项${prev.length + 1}`,
      }

      const copyOptions = [...prev]

      copyOptions.splice(addIndex, 0, newOptions)

      return copyOptions
    })
  }, [])

  const handleRemoveOption = useCallback((index: number) => {
    setOptions((prev) => {
      if (prev.length <= 1) return prev; // 至少保留一个选项
      return prev.filter((_option, i) => i !== index)
    })
  }, [])

  const handleUpOption = useCallback((index: number) => {
    setOptions((prev) => {
      if (index === 0) return prev;
      const copyOptions = [...prev]
      const temp = copyOptions[index]
      copyOptions[index] = copyOptions[index - 1]
      copyOptions[index - 1] = temp
      return copyOptions
    })
  }, [])

  const handleDownOption = useCallback((index: number) => {
    setOptions((prev) => {
      if (index === prev.length - 1) return prev;
      const copyOptions = [...prev]
      const temp = copyOptions[index]
      copyOptions[index] = copyOptions[index + 1]
      copyOptions[index + 1] = temp
      return copyOptions
    })
  }, [])

  return (
    <div>

      <TextInput
        label="问题"
        description="请输入默认问题"
        placeholder="默认问题"
      />


      <div className="max-w-xs">

        {
          options.map((option, index) => {
            return (

              <OptionInput
                key={option.id}
                index={index}
                option={option}
                handleAddOption={handleAddOption}
                handleRemoveOption={handleRemoveOption}
                handleUpOption={handleUpOption}
                handleDownOption={handleDownOption}
              />

            )
          })
        }
      </div>

    </div>
  )
}

function OptionInput(props: {
  index: number,
  option: {
    id: string,
    value: string,
  };
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
