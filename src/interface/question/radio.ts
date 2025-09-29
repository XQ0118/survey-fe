import type { ITemplateSchema } from "@/interface/question/schema";
import { nanoid } from "nanoid";

export interface IRadioOption {
  id: string;
  value: string;
  label?: string;
}

export interface IRadioQuestionSchema extends ITemplateSchema {
  type: 'radio';
  options: IRadioOption[];
}

export function initRadioQuestionSchema(): IRadioQuestionSchema {
  return {
    id: nanoid(),
    question: '',
    type: 'radio',
    options: [
      {
        id: nanoid(),
        value: '',
      },
    ],
  }
}