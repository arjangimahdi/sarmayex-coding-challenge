<template>
    <div class="app-progress-indicator w-full flex flex-col">
        <div class="flex flex-row justify-between items-center">
            <button
                class="bg-transparent text-sm px-4 py-2 flex items-center"
                @click="goBackHandler"
                :class="[canNavigateBack ? 'text-gray-100' : 'text-gray-400 pointer-events-none']"
            >
                <Icon name="tabler:chevron-left" size="16" />
                <span class="leading-none ml-1 block"> Back </span>
            </button>

            <div class="flex flex-col justify-center items-center" v-if="activeStepItem">
                <span class="md:text-base text-sm font-bold text-white capitalize">
                    {{ activeStepItem?.name }}
                </span>
                <span class="text-gray-400 md:text-base text-sm">
                    {{ activeStepItem?.id + "/" + stepItems.length }}</span
                >
            </div>

            <button
                class="bg-transparent text-sm px-4 py-2 flex items-center"
                @click="goNextHandler"
                :class="[canNavigateNext ? 'text-gray-100' : 'text-gray-400 pointer-events-none']"
            >
                <span class="leading-none mr-1 block"> Next </span>
                <Icon name="tabler:chevron-right" size="16" />
            </button>
        </div>

        <div class="w-full h-2 rounded-full bg-gray-500 bg-opacity-30 overflow-hidden mt-2">
            <div
                class="bg-gradient-to-r rounded-full h-full transition-all from-cyan-500 to-blue-500"
                :style="[`width: ${indicatorWidth}%`]"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// * types
import type { RouteRecordRaw } from "vue-router";

// * composables
import { useProgressIndicator } from "~/composables/components/useProgressIndicator";
const { stepItems, activeStepId, activeStepItem, canNavigateBack, canNavigateNext, nextStepHandler, prevStepHandler } =
    useProgressIndicator();

// * router
const router = useRouter();

// * computed properties
const indicatorWidth = computed(() => {
    const percentage = ((activeStepItem.value?.id as number) / stepItems.value.length) * 100;
    return percentage.toFixed();
});

// * methods
const initProgressIndicatorStepItems = () => {
    const routes = router.options.routes.filter((route) => route.path.includes("purchase"));

    routes.forEach((item: RouteRecordRaw) => {
        stepItems.value.push({
            route: item,
            name: item.name as string,
            step: +item.meta.key as number,
            id: +item.meta.key as number,
        });
    });

    stepItems.value = bubbleSort(stepItems.value, "id");
};
const bubbleSort = (array: any[], field: string) => {
    return array.sort((a, b) => {
        return a[field] - b[field];
    });
};

// * watch
watch(activeStepId, (newValue) => {
    canNavigateBack.value = newValue > 1;

    if (activeStepId.value > stepItems.value.length - 1) {
        canNavigateNext.value = false;
    } else {
        canNavigateNext.value = true;
    }
});

const goNextHandler = () => {
    nextStepHandler();
    navigateTo(activeStepItem.value?.route.path);
};
const goBackHandler = () => {
    prevStepHandler();
    navigateTo(activeStepItem.value?.route.path);
};

onMounted(() => {
    navigateTo("/purchase/currencies");
    initProgressIndicatorStepItems();
});
</script>

<style scoped></style>
