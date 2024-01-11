import type { StepItemInterface } from "~/interfaces/components/progress-indicator.interface";

export const useProgressIndicator = () => {
    const activeStepId = useState<number>("activeStep", () => 0);
    const stepItems = useState<StepItemInterface[]>("stepItems", () => []);
    const canNavigateBack = useState<boolean>("canNavigateBack", () => false);
    const canNavigateNext = useState<boolean>("canNavigateNext", () => false);

    const activeStepItem = computed(() => {
        return stepItems.value.find((item) => item.id == activeStepId.value);
    });

    return {
        stepItems,
        activeStepId,
        activeStepItem,
        canNavigateBack,
        canNavigateNext,
    };
};
