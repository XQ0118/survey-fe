import type { ITemplateSchema } from "@/interface/question/schema";

export interface IRadioOption {
  id: string;
  value: string;
  label?: string;
}

export interface IRadioQuestionSchema extends ITemplateSchema {
  type: 'radio';
  options: IRadioOption[];
}
