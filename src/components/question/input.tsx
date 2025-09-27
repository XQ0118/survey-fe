import {   Textarea, TextInput } from "@mantine/core";
import { cn } from "@/utils/cn";

export function InputQuestion() {
  return (
    <div>
      <div className={
        cn(
          'max-w-md',
          'flex flex-col gap-2.5'
        )
      }>

        <TextInput
          label={`${1} 题目`}
          withAsterisk
          description="请输入问题"
          placeholder="问题"
        />


        <Textarea
          placeholder="答案框"
          readOnly
          disabled
        />

      </div>
    </div>
  )
}
