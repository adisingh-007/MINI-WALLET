function TransactionItem({ transaction, onDelete, showDelete }) {
  const isCredit = transaction.type === "credit";
  const isFailed = transaction.status === "failed";

  const totalAmount = isCredit
    ? transaction.amount
    : transaction.amount + (transaction.fee || 0);

  const formattedDate = new Date(transaction.date).toLocaleString();

  return (
    <div
      className={`card transaction-item ${
        showDelete ? "has-delete" : "no-delete"
      } ${isFailed ? "failed-transaction" : ""}`}
    >
      <div className="tx-date">{formattedDate}</div>

      <div className="tx-details">
        <strong>
          {isCredit ? "Money Credited" : "Money Debited"}
          {isFailed && <span className="tx-failed"> (Failed)</span>}
        </strong>

        {transaction.recipient && (
          <span className="tx-recipient">
            To: {transaction.recipient}
          </span>
        )}

        {!isCredit && transaction.fee != null && (
          <>
            <span className="tx-fee">Sent: ₹{transaction.amount}</span>
            <span className="tx-fee">Fee: ₹{transaction.fee}</span>
          </>
        )}
      </div>

      <div className={`tx-amount ${isCredit ? "credit" : "debit"}`}>
        {isCredit ? "+" : "-"}₹{totalAmount}
      </div>

      {showDelete && (
        <div className="tx-action">
          <button onClick={() => onDelete(transaction.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default TransactionItem;
