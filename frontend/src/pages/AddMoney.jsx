import { useState } from "react";
import api from "../services/api";

export default function AddMoney({ onAddMoney }) {
  const [inputAmount, setInputAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFunds = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const amount = Number(inputAmount);
    if (!amount || amount <= 0) {
      setErrorMsg("Please enter a valid amount");
      return;
    }

    try {
      setIsLoading(true);

      await api.post("/transactions", {
        type: "credit",
        amount,
        status: "success",
        date: new Date().toISOString() // ✅ DATE + TIME
      });

      onAddMoney(amount);
      setSuccessMsg(`₹${amount} added successfully`);
      setInputAmount("");

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setErrorMsg("Failed to add funds");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add Funds</h2>

      <form onSubmit={handleAddFunds}>
        <input
          type="number"
          placeholder="Enter amount"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          disabled={isLoading}
        />

        <div className="form-message-slot">
          {errorMsg && <p className="error">{errorMsg}</p>}
          {successMsg && <p className="success">{successMsg}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Money"}
        </button>
      </form>
    </div>
  );
}
