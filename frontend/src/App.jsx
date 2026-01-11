import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard";
import AddMoney from "./pages/AddMoney";
import Navbar from "./components/Sidebar";
import TransferMoney from "./pages/TransferMoney";
import Transactions from "./pages/Transactions";
import api from "./services/api";
import { calculateBalance } from "./utils/calculateBalance";

export default function App() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
      setWalletBalance(calculateBalance(res.data));
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  // No balance math here anymore
  const handleAddMoney = async () => {
    await fetchTransactions();
  };

  const handleTransfer = async () => {
    await fetchTransactions();
    return true;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Dashboard balance={walletBalance} />}
          />

          <Route
            path="/add"
            element={<AddMoney onAddMoney={handleAddMoney} />}
          />

          <Route
            path="/transfer"
            element={
              <TransferMoney
                balance={walletBalance}
                onTransfer={handleTransfer}
              />
            }
          />

          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </div>
  );
}
