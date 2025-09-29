import { initInputQuestionSchema, type IInputQuestionSchema } from "@/interface/question/input";
import { initRadioQuestionSchema, type IRadioQuestionSchema } from "@/interface/question/radio";
import type { TSchemaType } from "@/interface/question/schema";
import { observable } from "@legendapp/state";

export interface IEditorStore {
  questions: (IRadioQuestionSchema | IInputQuestionSchema)[];
  addQuestion: (type: TSchemaType) => void;
}

export const editorStore$ = observable<IEditorStore>({
  questions: [],
  // actions
  addQuestion: (type: TSchemaType) => {
    if (type === 'radio') {
      editorStore$.questions.push(initRadioQuestionSchema())
    } else if (type === 'input') {
      editorStore$.questions.push(initInputQuestionSchema())
    }
  },

})