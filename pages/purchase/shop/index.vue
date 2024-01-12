<template>
    <div class="">
        <h1 class="text-2xl font-bold text-white mb-4">Easy Shopping</h1>
        <div class="grid md:grid-cols-5 gap-3">
            <div class="col-span-2">
                <AppInput
                    v-model="payAmount"
                    name="pay"
                    placeholder="Enter Value"
                    label="You Pay"
                    size="lg"
                    @input="calculateExchangeHandler('pay')"
                >
                    <template #helper>
                        <span class="text-gray-400 text-xs capitalize" v-if="payAmount > 9000">
                            {{ payCurrencyConverter }} TMN
                        </span>
                    </template>
                </AppInput>
            </div>
            <div class="md:col-span-1 col-span-2 md:flex-row flex-col flex justify-between items-center">
                <span class="font-bold text-white">TMN</span>
                <Icon :name="mobile ? 'tabler:arrow-down' : 'tabler:arrow-right'" class="text-gray-400 md:mx-1 my-2" />
                <span class="font-bold text-white">{{ selectedCurrencyItem?.unit_name }}</span>
            </div>
            <div class="col-span-2">
                <AppInput
                    v-model="getAmount"
                    name="get"
                    placeholder="Enter Value"
                    label="You Get"
                    size="lg"
                    @input="calculateExchangeHandler('get')"
                >
                    <template #helper>
                        <span class="text-gray-400 text-xs capitalize"> $ {{ amountPerCoin }} Per Coin </span>
                    </template>
                </AppInput>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// * store
import { currencyStore } from "~/store/pages/currency.store";
import { shopStore } from "~/store/pages/shop.store";
const { selectedCurrencyItem } = currencyStore();
const { getAmount, payAmount } = shopStore();

// * config
import { USDTPrice } from "~/config/index.config";

// * composables
const { mobile } = useResponsive();

// * meta
definePageMeta({
    name: "shop",
    key: "2",
});

// * head
useHead({
    title: "Sarmayex - Shop",
});

// * initial calculation
getAmount.value = ((payAmount.value as number) / USDTPrice / selectedCurrencyItem.value?.value).toFixed(4);

// * computed properties
const payCurrencyConverter = computed(() => {
    let amount: number = payAmount.value as number;
    let result = "";
    

    if (amount >= 1000000000) {
        const billions = Math.floor(amount / 1000000000);
        amount %= 1000000000;
        result += `${billions} billion `;
    }

    if (amount >= 1000000) {
        const millions = Math.floor(amount / 1000000);
        amount %= 1000000;
        result += `${millions} million `;
    }

    if (amount >= 1000) {
        const thousands = Math.floor(amount / 1000);
        amount %= 1000;
        result += `${thousands} thousand `;
    }

    if (amount >= 100) {
        const hundreds = Math.floor(amount / 100);
        amount %= 100;
        result += `${hundreds} hundred `;
    }

    if (amount > 0) {
        result += `${amount}`;
    }

    return result;
});
const amountPerCoin = computed(() => {
    return selectedCurrencyItem?.value?.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

// * methods
const calculateExchangeHandler = (type: "get" | "pay") => {
    if (type == "pay") getAmount.value = (payAmount.value / USDTPrice / selectedCurrencyItem.value?.value).toFixed(4);
    else payAmount.value = getAmount.value * selectedCurrencyItem.value?.value * USDTPrice;
};

onMounted(() => {});
</script>

<style scoped></style>
