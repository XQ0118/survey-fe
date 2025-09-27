const SchemaType = {
  radio: 'radio',
  input: 'input',
} as const

export type TSchemaType = keyof typeof SchemaType

export interface ITemplateSchema {
  id: string;
  question: string;
  type: TSchemaType;
  options: {
    id: string;
    value: string;
  }[];
}

