import { ActionIcon, Button, Group, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";
import { PlusIcon, MinusIcon } from "@phosphor-icons/react";
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
    setOptions((prev) => prev.filter((_option, i) => i !== index))
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
}) {
  const { index, option, handleAddOption, handleRemoveOption } = props;
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
        <ActionIcon variant="filled" aria-label="Settings">
          up
        </ActionIcon>

        <ActionIcon variant="filled" aria-label="Settings">
          down
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
