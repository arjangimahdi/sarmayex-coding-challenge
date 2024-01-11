import type { StepItemInterface } from "~/interfaces/components/progress-indicator.interface";

export const useProgressIndicator = () => {
    const activeStepId = useState<number>("activeStep", () => 1);
    const stepItems = useState<StepItemInterface[]>("stepItems", () => []);
    const canNavigateBack = useState<boolean>("canNavigateBack", () => false);
    const canNavigateNext = useState<boolean>("canNavigateNext", () => false);

    const activeStepItem = computed(() => {
        return stepItems.value.find((item) => item.id == activeStepId.value);
    });
    const nextStepHandler = () => {
        const found = stepItems.value.find((item) => item.id == activeStepItem.value.id + 1);
        if (found) {
            activeStepId.value = found.id;
        }
    };
    const prevStepHandler = () => {
        if (activeStepId.value > 1) {
            const found = stepItems.value.find((item) => item.id == activeStepItem.value.id - 1);
            if (found) {
                activeStepId.value = found.id;
            }
        }
    };

    return {
        stepItems,
        activeStepId,
        activeStepItem,
        canNavigateBack,
        canNavigateNext,
        nextStepHandler,
        prevStepHandler,
    };
};
