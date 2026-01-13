import { useEffect, useState } from "react";
import TransactionList from "../components/TransactionList";
import api from "../services/api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/transactions");
      setTransactions(res.data.slice().reverse());
      setError("");
    } catch {
      setError("Failed to load transactions");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    } catch {
      alert("Failed to delete transaction");
    }
  };

 // time filtering logic
  const now = Date.now();

  const filteredTransactions = transactions.filter((tx) => {
    // Status filter
    if (statusFilter !== "all" && tx.status !== statusFilter) {
      return false;
    }

    if (timeFilter !== "all") {
      const txTime = new Date(tx.date).getTime();
      const diffMinutes = (now - txTime) / (1000 * 60);

      if (timeFilter === "30min" && diffMinutes > 30) return false;
      if (timeFilter === "60min" && diffMinutes > 60) return false;
      if (timeFilter === "1day" && diffMinutes > 1440) return false;
      if (timeFilter === "older" && diffMinutes <= 1440) return false;
    }

    return true;
  });

  return (
    <div className="transactions-page">
      <h2 className="page-title">Transaction History</h2>

      {/* FILTERS */}
      <div className="filters">
        <div className="filter-group">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Time</label>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="30min">Last 30 minutes</option>
            <option value="60min">Last 60 minutes</option>
            <option value="1day">Last 1 day</option>
            <option value="older">More than 1 day</option>
          </select>
        </div>

        {(statusFilter !== "all" || timeFilter !== "all") && (
          <button
            className="clear-filters"
            onClick={() => {
              setStatusFilter("all");
              setTimeFilter("all");
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      <p className="count-text">
        Showing {filteredTransactions.length} of {transactions.length} transactions
      </p>

      <TransactionList
        transactions={filteredTransactions}
        loading={loading}
        onDelete={handleDelete}
        showDelete
      />
    </div>
  );
}
