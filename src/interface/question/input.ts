import type { ITemplateSchema } from "@/interface/question/schema";
import { nanoid } from "nanoid";

export interface IInputQuestionSchema extends ITemplateSchema {
  type: 'input';
  options: [{
    id: string;
    value: string;
  }];
}

export function initInputQuestionSchema(): IInputQuestionSchema {
  return {
    id: nanoid(),
    question: '',
    type: 'input',
    options: [{
      id: nanoid(),
      value: '',
    }],
  }
}