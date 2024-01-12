<template>
    <div class="app-checkbox cursor-pointer inline-flex items-center" :class="[state]">
        <div class="app-checkbox-container">
            <input
                type="checkbox"
                v-model="checkBoxValue"
                class="peer app-checkbox-input"
                @change="updateValue(checkBoxValue)"
                :disabled="state === 'disabled' ? true : false"
                :class="`size-${size} checkbox-input-${state}`"
            />
            <Icon
                :name="checkIcon"
                :class="`app-checkbox-icon-${state}`"
                :size="size === 'lg' ? '16px' : '12px'"
                class="peer-checked:!block !hidden app-checkbox-icon"
            />
        </div>
        <div
            :class="size === 'sm' && 'text-body-sm'"
            class="text-gray-500 font-bold"
            @click="updateValue((checkBoxValue = !checkBoxValue))"
        >
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
// * interfaces
interface Props {
    modelValue?: any;
    checked?: boolean;
    checkIcon?: string;
    size?: "lg" | "sm";
    state?: "default" | "error" | "disabled";
}

// * emits
const emit = defineEmits(["update:modelValue"]);

// * props
const props = withDefaults(defineProps<Props>(), {
    size: "lg",
    state: "default",
    checkIcon: "tabler:check",
});

// * refs
const checkBoxValue = ref(props.checked ?? false);

// * methods
const updateValue = (value: boolean) => {
    emit("update:modelValue", value);
};

updateValue(checkBoxValue.value);
</script>

<style lang="scss" scoped>
.app-checkbox {
    &.default {
        &:hover {
            & .app-checkbox-container {
                @apply bg-gray-800 bg-opacity-20;
            }
        }
    }
    &-container {
        @apply relative flex items-center p-2 w-fit transition-all rounded-full;
    }
    &-input {
        @apply cursor-pointer rounded border-2 appearance-none;
        &-error {
            @apply border-red-400 checked:bg-red-400;
        }
        &-default {
            @apply border-gray-600  checked:bg-cyan-400 checked:border-cyan-400;
        }
        &-disabled {
            @apply cursor-not-allowed border-gray-800 bg-gray-800;
        }
    }
    &-icon {
        @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all text-gray-100;
        &-disabled {
            @apply text-gray-700;
        }
    }
}
.size {
    &-lg {
        @apply w-6 h-6;
    }
    &-sm {
        @apply w-4 h-4;
    }
}
.error {
    @apply hover:bg-red-100 bg-opacity-40;
}
</style>
