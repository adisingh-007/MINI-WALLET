export const calculateBalance = (transactions) => {
  return transactions.reduce((total, tx) => {
    if (tx.status !== "success") return total;

    if (tx.type === "credit") {
      return total + tx.amount;
    }

    if (tx.type === "debit") {
      return total - (tx.amount + (tx.fee || 0));
    }

    return total;
  }, 0);
};
