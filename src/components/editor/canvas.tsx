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
import { PreviewSurvey } from "@/components/render/preview-survey";

export function EditorCanvas() {

  const current = use$(stepStore$.current)



  console.log("current:", current)
  return (
    <div className={
      cn(
        'flex flex-col py-3',
        'min-h-dvh',
      )
    }>


      <Switch value={current}>
        {{
          0: () => <CoreQuestions />,
          1: () => <InfoQuestions />,
          2: () => <DescriptionQuestions />,
          3: () => <PreviewSurvey />,
        }}
      </Switch>


      {/* <Dev/> */}
    </div>
  )
}

function Dev() {
  const questions = use$(editorStore$.infoQuestions)
  return (
    <div className="p-2 bg-zinc-100 rounded">
      <pre className="text-xs">{JSON.stringify(questions, null, 2)}</pre>
    </div>
  )
}

function CoreQuestions() {
  return (
    <div>
      <h1 className="text-lg font-medium mb-2">核心问题</h1>
      <div className="flex flex-col">
        <Questions questions$={editorStore$.questions} />
      </div>
    </div>
  )
}

function InfoQuestions() {

  return (
    <div>
      <h1 className="text-lg font-medium mb-2">基本信息</h1>
      <div className="flex flex-col">
        <Questions questions$={editorStore$.infoQuestions} />
      </div>
    </div>
  )
}

function Questions(props: {
  questions$: Observable<(IRadioQuestionSchema | IInputQuestionSchema)[]>
}) {
  const { questions$ } = props;
  const currentStep = use$(stepStore$.currentStep)
  return (
    <Memo>
      {
        () => {
          return questions$.map((question$, index) => {
            // 不要在遍历中使用 get 会触发多余依赖，影响性能
            const question = question$.peek()
            if (question.type === 'radio') {
              return (
                <QuestionWrapper
                  key={question.id}
                  id={question.id}
                  type={currentStep?.value}>
                  <RadioQuestion
                    index={index}
                    schema$={question$ as Observable<IRadioQuestionSchema>}
                    type={currentStep?.value ?? ''}
                  />
                </QuestionWrapper>
              )
            }
            if (question.type === 'input') {
              return (
                <QuestionWrapper
                  key={question.id}
                  id={question.id}
                  type={currentStep?.value}>
                  <InputQuestion index={index}
                    schema$={question$ as Observable<IInputQuestionSchema>}
                    type={currentStep?.value ?? ''}
                  />
                </QuestionWrapper>
              )
            }

            return null
          })
        }
      }
    </Memo>
  )
}

function DescriptionQuestions() {
  const descriptionValue = use$(editorStore$._descriptionValue)
  return (
    <div>
      <h1 className="text-lg font-medium mb-2">调查说明</h1>
      <div className="text-base text-pretty">
        为了<InlineInputPopover
          defaultValue={descriptionValue}
          onValueChange={(value) => {
            editorStore$._descriptionValue.set(value)
          }} />。希望同学们如实填写，感谢大家的积极参与。
      </div>
    </div>
  )
}
