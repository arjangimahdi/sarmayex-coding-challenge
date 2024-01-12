export const shopStore = () => {
    const payAmount = useState<number>("payAmount", () => 50000);
    const getAmount = useState<number>("getAmount", () => 0);

    return {
      payAmount,
      getAmount
    };
};
