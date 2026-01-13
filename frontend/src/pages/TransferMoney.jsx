import { useState } from "react";
import api from "../services/api";

const TRANSFER_FEE_RATE = 0.02; // 2%
const MAX_TRANSFER_AMOUNT = 10000;

export default function TransferMoney({ balance, onTransfer }) {
  const [recipientName, setRecipientName] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const amount = Number(transferAmount);
  const fee = amount ? amount * TRANSFER_FEE_RATE : 0;
  const totalAmount = amount + fee;

  /* UI validation only */
  const validateTransfer = () => {
    if (!recipientName.trim()) return "Recipient name is required";
    if (!amount || amount <= 0) return "Enter a valid amount";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const error = validateTransfer();
    if (error) {
      setErrorMsg(error);
      return;
    }

    setShowConfirmation(true);
  };

  const confirmTransfer = async () => {
    setIsLoading(true);
    setErrorMsg("");

    const baseTransaction = {
      type: "debit",
      amount,
      recipient: recipientName,
      fee,
      date: new Date().toISOString() 
    };

    try {
      /* LIMIT EXCEEDED → FAILED */
      if (amount > MAX_TRANSFER_AMOUNT) {
        await api.post("/transactions", {
          ...baseTransaction,
          status: "failed"
        });

        setErrorMsg(`Transfer limit is ₹${MAX_TRANSFER_AMOUNT}`);
        setShowConfirmation(false);
        return;
      }

      /* INSUFFICIENT BALANCE → FAILED */
      if (balance < totalAmount) {
        await api.post("/transactions", {
          ...baseTransaction,
          status: "failed"
        });

        setErrorMsg("Insufficient balance");
        setShowConfirmation(false);
        return;
      }

      /* SUCCESS */
      await api.post("/transactions", {
        ...baseTransaction,
        status: "success"
      });

      onTransfer();

      setSuccessMsg("Transfer completed successfully");
      setRecipientName("");
      setTransferAmount("");
      setShowConfirmation(false);

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      await api.post("/transactions", {
        ...baseTransaction,
        status: "failed"
      });

      setErrorMsg("Transfer failed due to system error");
      setShowConfirmation(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Send Money</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipient name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          disabled={isLoading}
        />

        <input
          type="number"
          placeholder="Amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading}>
          Continue
        </button>
      </form>

      {transferAmount && (
        <p className="fee-text">
          Fee: ₹{fee.toFixed(2)} | Total: ₹{totalAmount.toFixed(2)}
        </p>
      )}

      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className="success">{successMsg}</p>}

      {showConfirmation && (
        <div className="confirm-box">
          <p>
            Send <strong>₹{amount}</strong> to{" "}
            <strong>{recipientName}</strong>?
          </p>
          <div className="confirm-actions">
            <button onClick={confirmTransfer} disabled={isLoading}>
              Confirm
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowConfirmation(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
