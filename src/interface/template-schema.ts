const SchemaType = {
  radio: 'radio',
  input: 'input',
} as const

export type SchemaType = keyof typeof SchemaType

export interface TemplateSchema {
  id: string;
  question: string;
  type: SchemaType;
  options: {
    id: string;
    value: string;
  }[];
}

export interface RadioSchema extends TemplateSchema {
  type: 'radio';
  options: {
    id: string;
    value: string;
  }[];
}

