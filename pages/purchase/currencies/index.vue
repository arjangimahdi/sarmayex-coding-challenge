<template>
    <div class="">
        <h1 class="text-2xl font-bold text-white mb-4">Choose a Token</h1>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <template v-for="currency in currencies" :key="currency.id">
                <AppCurrencyCard :item="currency" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
// * store
import { currencyStore } from "~/store/pages/currency.store";
const { currencies, fetchCurrencies, selectedCurrencyId } = currencyStore();

// * composables
import { useProgressIndicator } from "~/composables/components/useProgressIndicator";
const { activeStepId, canNavigateNext } = useProgressIndicator();
activeStepId.value = 1;

// * watch
watch(selectedCurrencyId, (newValue) => {
    canNavigateNext.value = newValue > 0;
});

// * fetch currencies
await fetchCurrencies();

// * meta
definePageMeta({
    name: "currency",
    key: '1',
    layout: 'dashboard'
});

// * head
useHead({
    title: 'Sarmayex - Currency'
})
</script>

<style scoped></style>
