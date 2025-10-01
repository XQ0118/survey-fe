import { initInputQuestionSchema, type IInputQuestionSchema } from "@/interface/question/input";
import { initRadioQuestionSchema, type IRadioQuestionSchema } from "@/interface/question/radio";
import type { TSchemaType } from "@/interface/question/schema";
import { observable, type Observable,   } from "@legendapp/state";

// 为了更好地了解同学们使用数字设备的情况，用于分析，得出合理建议，提升使用数字设备自我管理意识，特设计此问卷。希望同学们如实填写，感谢大家的积极参与。

export interface IEditorStore {
  questions: (IRadioQuestionSchema | IInputQuestionSchema)[];
  infoQuestions: (IRadioQuestionSchema | IInputQuestionSchema)[];
  _descriptionValue: string;
  description: () => string;
}

export const editorStore$ = observable<IEditorStore>({
  questions: [],
  infoQuestions: [],
  _descriptionValue: '',
  description: (): string => {
    return `为了${editorStore$._descriptionValue.get()}。希望同学们如实填写，感谢大家的积极参与。`
  },
})



 

function createQuestionActions(
  _questionType: 'core' | 'info',
  questions$: Observable<(IRadioQuestionSchema | IInputQuestionSchema)[]>,
) {
  return {
    moveUp: (id: string) => {
      const questions = questions$.peek();
      const index = questions.findIndex(question => question.id === id)
   
      if (index <= 0) return; // 同时处理了 -1 和 0 的情况

      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
      questions$.set(newQuestions);
    },
    moveDown: (id: string) => {
      const questions = questions$.peek();
      const index = questions.findIndex(question => question.id === id)
      if (index < 0 || index === questions.length - 1) return; // 同时处理找不到和已是最后的情况


      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
      questions$.set(newQuestions);
    },
    addQuestion: (type: TSchemaType) => {
      if (type === 'radio') {
        questions$.push(initRadioQuestionSchema())
      } else if (type === 'input') {
        questions$.push(initInputQuestionSchema())
      }
    },
    removeQuestion: (id: string) => {
      const index = questions$.findIndex(question$ => question$.peek().id === id)
      questions$.splice(index, 1)
    },
  }
}


export const coreQuestionActions = createQuestionActions('core',editorStore$.questions)
export const infoQuestionActions = createQuestionActions('info',editorStore$.infoQuestions)




const defaultCoreQuestions = [
  '今天你使用手机的大概时间？',
  '今天你观看电视的大概时间？',
  '今天你使用电脑的大概时间？',
  '今天你使用平板的大概时间？',
  '今天你使用游戏机的大概时间？',
]

export function getCoreQuestionPlaceholder() {
  return defaultCoreQuestions[Math.floor(Math.random() * defaultCoreQuestions.length)]
}

const defaultInfoQuestions = [
  '你的性别是？',
  '你的年龄是？',
  '现就读的年级？',
]

export function getInfoQuestionPlaceholder() {
  return defaultInfoQuestions[Math.floor(Math.random() * defaultInfoQuestions.length)]
}
