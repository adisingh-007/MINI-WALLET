import TransactionItem from "./TransactionItem";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

function TransactionList({ transactions, loading, onDelete, showDelete }) {
  if (loading) return <Loader />;

  if (!transactions || transactions.length === 0) {
    return <EmptyState message="No transactions found" />;
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="transaction-list">
      {sortedTransactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          transaction={tx}
          onDelete={onDelete}
          showDelete={showDelete}
        />
      ))}
    </div>
  );
}

export default TransactionList;
