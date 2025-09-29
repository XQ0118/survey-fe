import { RadioQuestion } from "@/components/question/radio";
import { InputQuestion } from "@/components/question/input";
import { For, use$ } from "@legendapp/state/react";
import { editorStore$ } from "@/components/editor/store";
import { cn } from "@/utils/cn";
import type { Observable } from "@legendapp/state";
import type { IRadioQuestionSchema } from "@/interface/question/radio";

export function EditorCanvas() {
  const questions = use$(editorStore$.questions)
  
  return (
    <div className={
      cn(
        'flex flex-col gap-px',
        
      )
    }>
    
      <For each={editorStore$.questions} optimized>
        {(item$,) => {
          // switch (item$.type.get()) 
          if (item$.type.get() === 'radio') {
            return (
              <RadioQuestion  schema$={item$ as Observable<IRadioQuestionSchema>}/>
            )
          }
          else if (item$.type.get() === 'input') {
            return (
              <InputQuestion />
            )
          }
          return <div>error</div>
        }}
      </For>
    </div>
  )
}
