import type { IStepItem } from "@/interface/step";
import { observable } from "@legendapp/state";

const steps: IStepItem[] = [
  {
    id: '1',
    name: '核心问题',
  },
  {
    id: '2',
    name: '基本信息',
  },
  {
    id: '3',
    name: '调查说明',
  },
  {
    id: '4',
    name: '调查说明',
  }
]

export interface IStepStore {
  steps: IStepItem[];
  current: number;
  currentStep: IStepItem
}

export const stepStore$ = observable<IStepStore>({
  steps: steps,
  current: 0,
  currentStep: () => {
    return stepStore$.steps.get()[stepStore$.current.get()]
  },
})

export const stepActions = {
  next: (steps: number = 1) => {
    stepStore$.current.set(
      Math.max(0, stepStore$.current.get() - steps)
    )

  },
  prev: (steps: number = 1) => {
    stepStore$.current.set(
      Math.min(stepStore$.steps.get().length - 1, stepStore$.current.get() + steps),
    )
  },
}