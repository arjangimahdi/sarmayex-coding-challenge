<template>
    <div class="">
        <h1 class="text-2xl font-bold text-white mb-4">Easy Shopping</h1>
        <div class="grid md:grid-cols-5 gap-3">
            <div class="col-span-2">
                <AppInput
                    v-model="pay"
                    name="pay"
                    placeholder="Enter Value"
                    label="You Pay"
                    size="lg"
                    @input="calculateExchangeHandler('pay')"
                >
                    <template #helper>
                        <span class="text-gray-400 text-xs capitalize" v-if="pay > 9000">
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
                    v-model="get"
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
const { selectedCurrencyItem } = currencyStore();

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

// * refs
const pay = ref<number | undefined>(50000);
const get = ref<number | undefined>(0);

// * initial calculation
get.value = ((pay.value as number) / USDTPrice / selectedCurrencyItem.value?.value).toFixed(4);

// * computed properties
const payCurrencyConverter = computed(() => {
    let amount = pay.value;
    const isNegative = (pay.value as number) < 0;
    amount = Math.abs(amount as number);
    const suffixes = ["", "thousand", "million", "billion"];

    let suffixIndex = 0;

    while (amount >= 1000 && suffixIndex < suffixes.length - 1) {
        amount /= 1000;
        suffixIndex++;
    }

    const sign = isNegative ? "-" : "";

    const formattedNumber = amount.toFixed();

    return sign + formattedNumber + " " + suffixes[suffixIndex];
});
const amountPerCoin = computed(() => {
    return selectedCurrencyItem?.value?.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

// * methods
const calculateExchangeHandler = (type: "get" | "pay") => {
    if (type == "pay") get.value = (pay.value / USDTPrice / selectedCurrencyItem.value?.value).toFixed(4);
    else pay.value = get.value * selectedCurrencyItem.value?.value * USDTPrice;
};

onMounted(() => {});
</script>

<style scoped></style>
