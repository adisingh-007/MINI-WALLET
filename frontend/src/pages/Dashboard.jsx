import { useEffect, useState } from "react";
import BalanceCard from "../components/Balancecard";
import TransactionList from "../components/TransactionList";
import api from "../services/api";

export default function Dashboard({ balance }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions on mount AND when balance changes
  useEffect(() => {
    fetchTransactions();
  }, [balance]); 

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/transactions");

      // Latest first
      const sorted = response.data.slice().reverse();
      setTransactions(sorted);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError("Unable to load transactions");
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const lastTenTransactions = transactions.slice(0, 10);

  return (
    <div className="dashboard">

      {/* BALANCE CARD ONLY */}
      <div className="dashboard-top">
        <div className="dashboard-card">
          <BalanceCard balance={balance} />
        </div>
      </div>

      <h3 className="section-title">Recent Transactions</h3>

      {/* ERROR STATE */}
      {error && <p className="error">{error}</p>}

      {/* EMPTY STATE
      {!isLoading && !error && lastTenTransactions.length === 0 && (
        <p className="empty-state">
          No transactions yet.
        </p>
      )} */}

      {/* TRANSACTION LIST */}
      <TransactionList
        transactions={lastTenTransactions}
        loading={isLoading}
        showDelete={false}
      />
    </div>
  );
}
