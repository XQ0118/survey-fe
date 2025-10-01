import { Memo, use$ } from "@legendapp/state/react";
import { Button, Fieldset, Group, Radio, Textarea } from "@mantine/core";
import { editorStore$ } from "@/components/editor/store/editor-store";
import { cn } from "@/utils/cn";
import type { IRadioQuestionSchema } from "@/interface/question/radio";
import type { IInputQuestionSchema } from "@/interface/question/input";

export function PreviewSurvey() {
  return (
    <main className={
      cn(
        
        'flex flex-col gap-3',
        'bg-zinc-50 p-2 rounded border-[0.5px] border-zinc-200 shadow-xs',
      )
    }>
      <h1 className="text-lg font-medium mb-2">预览问卷</h1>

      <SurveyDescription />

      <InfoFieldset />

      <CoreFieldset />

      <Group justify="flex-end" mt="md">
        <Button>提交</Button>
      </Group>

    </main>
  )
}

function SurveyDescription() {
  const description = use$(editorStore$.description)
  return (
    <div className="text-pretty text-zinc-700">{description}</div>
  )
}

function InfoFieldset() {
  const infoQuestions = use$(editorStore$.infoQuestions)
  return (
    <Fieldset legend="基本信息" className="flex flex-col gap-4">
      <RenderFieldset questions={infoQuestions} />
    </Fieldset>
  );
}


function CoreFieldset() {
  const questions = use$(editorStore$.questions)
  return (
    <Fieldset legend="核心问题" className="flex flex-col gap-4">
      <RenderFieldset questions={questions} />
    </Fieldset>
  );
}


function RenderFieldset(props: {
  questions: (IRadioQuestionSchema | IInputQuestionSchema)[];
}) {
  const { questions } = props;
  return (
    <Memo>
      {
        () => {
          return questions.map((question,) => {
            // 不要在遍历中使用 get 会触发多余依赖，影响性能

            if (question.type === 'radio') {
              return (
                <Radio.Group
                  key={question.id}
                  label={question.question}
                  withAsterisk
                >
                  <Group mt="xs">
                    {
                      question.options.map((option) => {
                        return (
                          <Radio
                            key={option.id}
                            value={option.value ?? option.label}
                            label={option.label}
                          />
                        )
                      })
                    }
                  </Group>
                </Radio.Group>
              )
            }
            if (question.type === 'input') {
              return (
                <Textarea
                  key={question.id}
                  label={question.question}
                  placeholder="请填写回答"
                />
              )
            }

            return null
          })
        }
      }
    </Memo>
  )
}
