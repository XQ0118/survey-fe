import { initInputQuestionSchema, type IInputQuestionSchema } from "@/interface/question/input";
import { initRadioQuestionSchema, type IRadioQuestionSchema } from "@/interface/question/radio";
import type { TSchemaType } from "@/interface/question/schema";
import { observable, type Observable } from "@legendapp/state";

// 为了更好地了解同学们使用数字设备的情况，用于分析，得出合理建议，提升使用数字设备自我管理意识，特设计此问卷。希望同学们如实填写，感谢大家的积极参与。

export interface IEditorStore {
  questions: (IRadioQuestionSchema | IInputQuestionSchema)[];
  infoQuestions: (IRadioQuestionSchema | IInputQuestionSchema)[];
}

export const editorStore$ = observable<IEditorStore>({
  questions: [],
  infoQuestions: [],
})

// export const coreQuestionActions = {
//   moveUp: (id: string) => {
//     const questions = editorStore$.questions.peek();
//     const index = questions.findIndex(question => question.id === id)
//     console.log("index", id, index)
//     if (index <= 0) return; // 同时处理了 -1 和 0 的情况


//     const newQuestions = [...questions];
//     [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
//     editorStore$.questions.set(newQuestions);
//   },
//   moveDown: (id: string) => {
//     const questions = editorStore$.questions.peek();
//     const index = questions.findIndex(question => question.id === id)
//     if (index < 0 || index === questions.length - 1) return; // 同时处理找不到和已是最后的情况


//     const newQuestions = [...questions];
//     [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
//     editorStore$.questions.set(newQuestions);
//   },
//   addQuestion: (type: TSchemaType) => {
//     if (type === 'radio') {
//       editorStore$.questions.push(initRadioQuestionSchema())
//     } else if (type === 'input') {
//       editorStore$.questions.push(initInputQuestionSchema())
//     }
//   },
//   removeQuestion: (id: string) => {
//     const index = editorStore$.questions.findIndex(question$ => question$.peek().id === id)
//     editorStore$.questions.splice(index, 1)
//   },
// }


// export const infoQuestionActions = {
//   moveUp: (id: string) => {
//     const questions = editorStore$.infoQuestions.peek();
//     const index = questions.findIndex(question => question.id === id)
//     console.log("index", id, index)
//     if (index <= 0) return; // 同时处理了 -1 和 0 的情况

//     const newQuestions = [...questions];
//     [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
//     editorStore$.infoQuestions.set(newQuestions);
//   },
//   moveDown: (id: string) => {
//     const questions = editorStore$.infoQuestions.peek();
//     const index = questions.findIndex(question => question.id === id)
//     if (index < 0 || index === questions.length - 1) return; // 同时处理找不到和已是最后的情况


//     const newQuestions = [...questions];
//     [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
//     editorStore$.infoQuestions.set(newQuestions);
//   },
//   addQuestion: (type: TSchemaType) => {
//     if (type === 'radio') {
//       editorStore$.infoQuestions.push(initRadioQuestionSchema())
//     } else if (type === 'input') {
//       editorStore$.infoQuestions.push(initInputQuestionSchema())
//     }
//   },
//   removeQuestion: (id: string) => {
//     const index = editorStore$.infoQuestions.findIndex(question$ => question$.peek().id === id)
//     editorStore$.infoQuestions.splice(index, 1)
//   },
// }



function createQuestionActions(questions$: Observable<(IRadioQuestionSchema | IInputQuestionSchema)[]>) {
  return {
    moveUp: (id: string) => {
      const questions = questions$.peek();
      const index = questions.findIndex(question => question.id === id)
      console.log("index", id, index)
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

 
export const coreQuestionActions = createQuestionActions(editorStore$.questions)
export const infoQuestionActions = createQuestionActions(editorStore$.infoQuestions)
