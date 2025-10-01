import { RadioQuestion } from "@/components/question/radio";
import { InputQuestion } from "@/components/question/input";
import { Memo, Switch, use$, } from "@legendapp/state/react";
import { editorStore$ } from "@/components/editor/store/editor-store";
import { cn } from "@/utils/cn";
import type { Observable } from "@legendapp/state";
import type { IRadioQuestionSchema } from "@/interface/question/radio";
import type { IInputQuestionSchema } from "@/interface/question/input";
import { QuestionWrapper } from "@/components/question/wrapper";
import { stepStore$ } from "@/components/editor/store/step-store";
import { InlineInputPopover } from "@/components/inline-input";

export function EditorCanvas() {
  // const questions = use$(editorStore$.questions)
  const current = use$(stepStore$.current)
  


  console.log("current:", current)
  return (
    <div className={
      cn(
        'flex flex-col',
      )
    }>
      <div className=" ">
         <div>
         为了更好地了解同学们使用数字设备的情况，用于分析，得出合理建议，提升使用数字设备自我管理意识，特设计此问卷。希望同学们如实填写，感谢大家的积极参与。
         </div>

         <div>
         为了<InlineInputPopover     />。希望同学们如实填写，感谢大家的积极参与。
         </div>
      </div>

      <Switch value={current}>
        {{
          0: () => <CoreQuestions />,
          1: () => <InfoQuestions />,
          2: () => <DescriptionQuestions />,
          // 3:() =>  <ConclusionQuestions />,
        }}
      </Switch>


      {/* <div className="p-2 bg-zinc-100 rounded">
        <pre className="text-xs">{JSON.stringify(questions, null, 2)}</pre>
      </div> */}
    </div>
  )
}

function CoreQuestions() {
  const currentStep = use$(stepStore$.currentStep)
  return (
    <div>
      <h1>核心问题</h1>
      <div className="flex flex-col">
        <Memo>
          {
            () => {
              return editorStore$.questions.map((question$, index) => {
                // 不要在遍历中使用 get 会触发多余依赖，影响性能
                const question = question$.peek()
                if (question.type === 'radio') {
                  return (
                    <QuestionWrapper key={question.id} id={question.id} type={currentStep.value}>
                      <RadioQuestion index={index} schema$={question$ as Observable<IRadioQuestionSchema>} />
                    </QuestionWrapper>
                  )
                }
                if (question.type === 'input') {
                  return (
                    <QuestionWrapper key={question.id} id={question.id} type={currentStep.value}>
                      <InputQuestion index={index} schema$={question$ as Observable<IInputQuestionSchema>} />
                    </QuestionWrapper>
                  )
                }

                return null
              })
            }
          }
        </Memo>
      </div>
    </div>
  )
}

function InfoQuestions() {
  const currentStep = use$(stepStore$.currentStep)

  return (
    <div>
      <h1>基本信息</h1>
      <div className="flex flex-col">
        <Memo>
          {
            () => {
              return editorStore$.infoQuestions.map((question$, index) => {
                // 不要在遍历中使用 get 会触发多余依赖，影响性能
                const question = question$.peek()
                if (question.type === 'radio') {
                  return (
                    <QuestionWrapper key={question.id} id={question.id} type={currentStep.value}>
                      <RadioQuestion index={index} schema$={question$ as Observable<IRadioQuestionSchema>} />
                    </QuestionWrapper>
                  )
                }
                if (question.type === 'input') {
                  return (
                    <QuestionWrapper key={question.id} id={question.id} type={currentStep.value}>
                      <InputQuestion index={index} schema$={question$ as Observable<IInputQuestionSchema>} />
                    </QuestionWrapper>
                  )
                }

                return null
              })
            }
          }
        </Memo>
      </div>
    </div>
  )
}

function DescriptionQuestions() {
  return (
    <div>
      <h1></h1>
      <div className=" ">
         为了更好地了解同学们使用数字设备的情况，用于分析，得出合理建议，提升使用数字设备自我管理意识，特设计此问卷。希望同学们如实填写，感谢大家的积极参与。
      </div>
    </div>
  )
}
