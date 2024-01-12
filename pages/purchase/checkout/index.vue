<template>
    <div class="">
        <h1 class="text-2xl font-bold text-white mb-4">Checkout</h1>

        <div class="grid grid-cols-5 gap-4">
            <div class="col-span-2 bg-zinc-700 border border-zinc-800 rounded-md p-4">
                <h4 class="text-base font-bold text-white mb-3">
                    Payment Amount
                </h4>
                <span class="font-medium text-gray-300">{{ payAmount }} <small>TMN</small></span>
            </div>
            <div class="col-span-1 flex justify-center items-center ">
                <Icon name="tabler:arrow-right" size="32" class="text-white" />
            </div>
            <div class="col-span-2 bg-zinc-700 border border-zinc-800 rounded-md p-4">
                <h4 class="text-base font-bold text-white mb-3">
                    Received Amount
                </h4>
                <span class="font-medium text-gray-300">{{ getAmount }} <small>{{ selectedCurrencyItem?.unit_name }}</small></span>
            </div>
        </div>

        <AppCheckbox class="mt-3 ml-2" v-model="transferToWallet">
            <template #default>
                Transfer To My Wallet
            </template>
        </AppCheckbox>

        <div class="fixed w-full p-4 bg-zinc-900 bottom-0 left-0">
            <button class="w-full bg-gradient-to-r rounded-full h-full transition-all from-cyan-500 to-blue-500 py-3 text-white font-bol">
                Purchase
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// * meta
definePageMeta({
    name: "checkout",
    key: '3',
});

// * head
useHead({
  title: 'Sarmayex - Checkout',
})

// * store
import { shopStore } from '~/store/pages/shop.store';
import { currencyStore } from '~/store/pages/currency.store';
const { getAmount,payAmount } = shopStore();
const { selectedCurrencyItem } = currencyStore();

// * composables
import { useProgressIndicator } from '~/composables/components/useProgressIndicator';
const { canNavigateNext } = useProgressIndicator();

canNavigateNext.value = false;

// * refs
const transferToWallet = ref<boolean>(false);
</script>

<style scoped></style>
