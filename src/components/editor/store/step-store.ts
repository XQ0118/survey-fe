import type { IStepItem } from "@/interface/step";
import { observable } from "@legendapp/state";

const steps: IStepItem[] = [
  {
    id: '1',
    name: '核心问题',
    value: 'core',
  },
  {
    id: '2',
    name: '基本信息',
    value: 'info',
  },
  {
    id: '3',
    name: '调查说明',
    value: 'description',
  },

]

export interface IStepStore {
  steps: IStepItem[];
  current: number;
  currentStep: () => IStepItem | undefined;
  isCompleted: () => boolean;
}

export const stepStore$ = observable<IStepStore>({
  steps: steps,
  current: 0,
  currentStep: (): IStepItem | undefined => {
    return stepStore$.steps.get()[stepStore$.current.get()]
  },
  isCompleted: (): boolean => {
    return stepStore$.current.get() === stepStore$.steps.get().length
  }
})

export const stepActions = {
  prev: (steps: number = 1) => {
    stepStore$.current.set(
      Math.max(0, stepStore$.current.get() - steps)
    )

  },
  next: (steps: number = 1) => {
    console.log("next", Math.min(
      stepStore$.steps.get().length,
      stepStore$.current.get() + steps
    ),)
    stepStore$.current.set(
      Math.min(
        stepStore$.steps.get().length,
        stepStore$.current.get() + steps
      ),
    )
  },
}
