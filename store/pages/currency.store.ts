import type { CurrencyInterface } from "~/interfaces/data/currency.interface"

export const currencyStore = () => {
  const currencies = useState<CurrencyInterface[]>("currencies", () => []);
  const selectedCurrencyId = useState<number>("selectedCurrencyId", () => 0);
  const selectedCurrencyItem = useState<CurrencyInterface | undefined>("selectedCurrencyItem", () => undefined);

  const fetchCurrencies = async () => {
    const { data } = await useFetch('/api/currencies');

    currencies.value = data.value as CurrencyInterface[];
  }

  return {
    currencies,
    fetchCurrencies,
    selectedCurrencyId,
    selectedCurrencyItem,
  }
}