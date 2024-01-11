<template>
    <div
        :class="[selectedCurrencyId == item.id ? 'border border-cyan-700 bg-cyan-600' : 'bg-zinc-600']"
        class="hover:bg-opacity-35 transition-all cursor-pointer bg-opacity-20 p-3 rounded-md"
        @click="selectCurrencyHandler(item)"
    >
        <div class="flex flex-col">
            <div class="flex flex-row items-center text-white">
                <Icon :name="item.icon" size="32" />
                <div class="flex flex-col ml-3">
                    <span class="text-sm max-w-[100px] truncate">
                        {{ item.name }}
                    </span>
                    <small class="text-xsm">
                        {{ item.unit_name }}
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// * types
import type { CurrencyInterface } from "~/interfaces/data/currency.interface";

// * store
import { currencyStore } from "~/store/pages/currency.store";
const { selectedCurrencyId, selectedCurrencyItem } = currencyStore();

// * interface
interface Props {
    item: CurrencyInterface;
}

// * props
defineProps<Props>();

// * methods
const selectCurrencyHandler = (currency: CurrencyInterface) => {
    if (currency.id == selectedCurrencyId.value) {
        selectedCurrencyId.value = 0;
        selectedCurrencyItem.value = undefined
        return;
    }
    selectedCurrencyId.value = currency.id;
    selectedCurrencyItem.value = currency;
};
</script>

<style scoped></style>
