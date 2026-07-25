import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import TransactionForm from "./TransactionForm.jsx";
import TransactionList from "./TransactionList.jsx";
import Balance from "./Balance.jsx";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  const handleCreate = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/top" element={<Balance />} />
        <Route
          path="/registration"
          element={<TransactionForm onCreated={handleCreate} />}
        />
        <Route path="/list" element={<TransactionList list={transactions} />} />
      </Routes>
    </div>
  );
}

export default App;
