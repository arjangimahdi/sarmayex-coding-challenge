import type { CurrencyInterface } from "~/interfaces/data/currency.interface"

export const currencyStore = () => {
  const currencies = useState<CurrencyInterface[]>("currencies", () => []);
  const selectedCurrency = useState<number>("selectedCurrency", () => 0);

  const fetchCurrencies = async () => {
    const { data } = await useFetch('/api/currencies');

    currencies.value = data.value as CurrencyInterface[];
  }

  return {
    currencies,
    fetchCurrencies,
    selectedCurrency
  }
}