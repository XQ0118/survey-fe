import { RadioQuestion } from "@/components/question/radio";
import { InputQuestion } from "@/components/question/input";
import {   Memo, } from "@legendapp/state/react";
import { editorStore$ } from "@/components/editor/editor-store";
import { cn } from "@/utils/cn";
import type { Observable } from "@legendapp/state";
import type { IRadioQuestionSchema } from "@/interface/question/radio";
import type { IInputQuestionSchema } from "@/interface/question/input";
import { QuestionWrapper } from "@/components/question/wrapper";

export function EditorCanvas() {
  // const questions = use$(editorStore$.questions)

  return (
    <div className={
      cn(
        'flex flex-col',

      )
    }>
      <Memo>
        {
          () => {
            return editorStore$.questions.map((question$, index) => {
              // 不要在遍历中使用 get 会触发多余依赖，影响性能
              const question = question$.peek()
              if (question.type === 'radio') {
                return (
                  <QuestionWrapper key={question.id} id={question.id}>
                    <RadioQuestion   index={index} schema$={question$ as Observable<IRadioQuestionSchema>} />
                  </QuestionWrapper>
                )
              }
              if (question.type === 'input') {
                return (
                  <QuestionWrapper key={question.id} id={question.id}>
                    <InputQuestion   index={index} schema$={question$ as Observable<IInputQuestionSchema>} />
                  </QuestionWrapper>
                )
              }

              return null
            })
          }
        }
      </Memo>

      {/* <div className="p-2 bg-zinc-100 rounded">
        <pre className="text-xs">{JSON.stringify(questions, null, 2)}</pre>
      </div> */}
    </div>
  )
}
