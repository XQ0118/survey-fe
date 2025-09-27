import type { ITemplateSchema } from "@/interface/question/schema";

export interface IInputQuestionSchema extends ITemplateSchema {
  type: 'input';
  value: string;
}
