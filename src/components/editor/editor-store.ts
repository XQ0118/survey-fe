import { initInputQuestionSchema, type IInputQuestionSchema } from "@/interface/question/input";
import { initRadioQuestionSchema, type IRadioQuestionSchema } from "@/interface/question/radio";
import type { TSchemaType } from "@/interface/question/schema";
import { observable } from "@legendapp/state";

export interface IEditorStore {
  questions: (IRadioQuestionSchema | IInputQuestionSchema)[];
}

export const editorStore$ = observable<IEditorStore>({
  questions: [],
})

export const questionActions = {
  moveUp: (id: string) => {
    const questions = editorStore$.questions.peek();
    const index = questions.findIndex(question => question.id === id)
    console.log("index", id, index)
    if (index <= 0) return; // 同时处理了 -1 和 0 的情况

 
    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
    editorStore$.questions.set(newQuestions);
  },
  moveDown: (id: string) => {
    const questions = editorStore$.questions.peek();
    const index = questions.findIndex(question => question.id === id)
    if (index < 0 || index === questions.length - 1) return; // 同时处理找不到和已是最后的情况

 
    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
    editorStore$.questions.set(newQuestions);
  },
  addQuestion: (type: TSchemaType) => {
    if (type === 'radio') {
      editorStore$.questions.push(initRadioQuestionSchema())
    } else if (type === 'input') {
      editorStore$.questions.push(initInputQuestionSchema())
    }
  },
  removeQuestion: (id: string) => {
    const index = editorStore$.questions.findIndex(question$ => question$.peek().id === id)
    editorStore$.questions.splice(index, 1)
  },
}