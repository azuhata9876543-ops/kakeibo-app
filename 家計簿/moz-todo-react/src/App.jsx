import { useState } from "react";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import TransactionForm from "./TransactionForm.jsx";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  const handleCreate = (nweTransaction) => {
    setTransactions((prev) => [...prev, nweTransaction]);
  };

  return (
    <div>
      <Header />
      <Login />

      <TransactionForm />
    </div>
  );
}

export default App;
