<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <template v-for="currency in currencies" :key="currency.id">
            <AppCurrencyCard :item="currency" />
        </template>
    </div>
</template>

<script setup lang="ts">
// * store
import { currencyStore } from "~/store/pages/currency.store";
const { currencies, fetchCurrencies } = currencyStore();

// * composables
import { useProgressIndicator } from "~/composables/components/useProgressIndicator";
const { activeStepId } = useProgressIndicator();

activeStepId.value = 1;

// * fetch currencies
await fetchCurrencies();

// * meta
definePageMeta({
    name: "currency",
});
</script>

<style scoped></style>
