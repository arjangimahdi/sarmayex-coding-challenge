<template>
    <div class="app-progress-indicator w-full flex flex-col">
        <div class="flex flex-row justify-between items-center">
            <button class="bg-transparent text-sm px-4 py-2 flex items-center" @click="goBackHandler" :class="[canNavigateBack ? 'text-gray-100' : 'text-gray-400 cursor-not-allowed']">
                <Icon name="tabler:chevron-left" size="16" />
                <span class="leading-none ml-1 block"> Back </span>
            </button>

            <div class="flex flex-col justify-center items-center">
                <span class="md:text-base text-sm font-bold text-white capitalize">
                    {{ activeStepItem?.name }}
                </span>
                <span class="text-gray-400 md:text-base text-sm">
                    {{ activeStepItem?.id + "/" + stepItems.length }}</span
                >
            </div>

            <button class="bg-transparent text-sm px-4 py-2 flex items-center" @click="goNextHandler" :class="[canNavigateNext ? 'text-gray-100' : 'text-gray-400 cursor-not-allowed']">
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
const { stepItems, activeStepItem, canNavigateBack, canNavigateNext } = useProgressIndicator();

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
    routes.forEach((item: RouteRecordRaw, index) => {
        stepItems.value.push({
            step: 1,
            route: item,
            id: index + 1,
            name: item.name as string,
        });
    });
};
const goNextHandler = () => {};
const goBackHandler = () => {};

onMounted(() => {
    initProgressIndicatorStepItems();
});
</script>

<style scoped></style>
