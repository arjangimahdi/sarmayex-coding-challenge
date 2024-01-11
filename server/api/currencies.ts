import { currenciesMock } from "~/data/currency.data";

export default defineEventHandler(() => {
    const data = {
        toJSON() {
            return currenciesMock
        },
    };
    return data;
});
