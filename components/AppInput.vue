<template>
  <div>
      <div :class="[stateClasses, sizeClasses]" class="border">
          <div v-if="prependIcon" role="button" @click="handlePrependClick">
              <Icon :name="prependIcon" size="24px" class="ml-4" />
          </div>

          <div class="relative h-full w-full" :class="(hasFocused || value) && label ? 'pt-4' : ''">
              <input
                  ref="inputRef"
                  class="outline-none peer bg-transparent w-full h-full pl-4"
                  v-bind="$attrs"
                  v-model="value"
                  :placeholder="hasFocused ? $attrs.placeholder as string : ''"
                  @input="handleInput"
                  @focus="hasFocused = true"
                  @blur="hasFocused = false"
              />

              <label
                  @click="focusInput"
                  class="absolute left-4 peer-focus:top-1 cursor-text peer-focus:translate-y-0 peer-focus:text-body-sm transition-all"
                  :class="value ? 'top-1 translate-y-0 text-body-sm ' : 'top-1/2 -translate-y-1/2'"
                  v-if="label && size !== 'sm'"
                  v-html="label"
              ></label>
          </div>

          <div v-if="appendIcon" role="button" @click="handleAppendClick">
              <Icon :name="appendIcon" size="24px" class="mr-4" />
          </div>
      </div>

      <div class="text-body-sm px-4 mt-1 text-red-200">{{ errorMessage }}</div>

      <div v-if="hasHelper && !errorMessage" class="text-body-sm px-4 mt-1" :class="stateClasses">
          <slot name="helper" />
      </div>
  </div>
</template>

<script setup lang="ts">
// * libs
import { cva } from "class-variance-authority";

// * interfaces
interface Props {
  appendIcon?: string;
  prependIcon?: string;
  modelValue?: any;
  state?: "error" | "success" | "default";
  size?: "sm" | "md" | "lg";
  label?: string;
  name: string;
}

// * emits
const emit = defineEmits(["update:modelValue", "onAppendClick", "onPrependClick"]);

// * props
const props = defineProps<Props>();

// * props
const slots = useSlots();

// * refs
const hasFocused = ref(false);
const inputRef = ref<HTMLInputElement>();

// * computed properties
const hasHelper = computed(() => {
  return !!slots.helper;
});
const stateClasses = computed(() => {
  return cva("rounded-lg relative flex items-center justify-between font-medium transition-all ", {
      variants: {
          state: {
              success: "border-green-200 text-green-100",
              error: "border-red-200 text-red-100 hover:border-red-200",
              default: "text-gray-400 border-gray-600 focus-within:border-blue-300 hover:border-gray-200",
          },
      },
      defaultVariants: { state: "default" },
  })({
      state: props.state,
  });
});
const sizeClasses = computed(() => {
  return cva("rounded-lg relative flex items-center font-medium transition-all ", {
      variants: {
          size: {
              sm: "h-10",
              md: "h-12",
              lg: "h-14",
          },
      },
      defaultVariants: { size: "lg" },
  })({
      size: props.size,
  });
});

// * methods
const handleInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const handleAppendClick = () => {
  emit("onAppendClick");
};

const handlePrependClick = () => {
  emit("onPrependClick");
};

const focusInput = () => {
  inputRef.value?.focus();
};

// * vee-validate
const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
  initialValue: props.modelValue,
});
</script>