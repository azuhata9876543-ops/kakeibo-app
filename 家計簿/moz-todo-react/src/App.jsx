import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import TransactionForm from "./TransactionForm.jsx";
import TransactionList from "./TransactionList.jsx";
import TransactionDetail from "./TransactionDetail.jsx";
import Balance from "./Balance.jsx";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saveData = localStorage.getItem("kakeibo_data");
    return saveData ? JSON.parse(saveData) : [];
  });

  useEffect(() => {
    localStorage.setItem("kakeibo_data", JSON.stringify(transactions));
  }, [transactions]);

  const handleCreate = (newTransaction) => {
    setTransactions((prev) => [...prev, { ...newTransaction, id: Date.now() }]);
  };

  const handleUpdate = (updateItem) => {
    setTransactions((prev) =>
      prev.map((item) => (item.id === updateItem.id ? updateItem : item)),
    );
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== Number(id)));
  };

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/top" element={<Balance list={transactions} />} />
        <Route
          path="/registration"
          element={<TransactionForm onCreated={handleCreate} />}
        />
        <Route path="/list" element={<TransactionList list={transactions} />} />
        <Route
          path="/detail/:id"
          element={
            <TransactionDetail
              list={transactions}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
