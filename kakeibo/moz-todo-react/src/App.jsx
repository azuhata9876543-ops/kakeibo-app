import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import TransactionForm from "./TransactionForm.jsx";
import TransactionList from "./TransactionList.jsx";
import TransactionDetail from "./TransactionDetail.jsx";
import Balance from "./Balance.jsx";
import "./App.css";

const API_URL = "http://localhost:8080/api/transactions";

function App() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("データの取得に失敗しました");
        setTransactions(await res.json());
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
  }, []);

  const handleCreate = async (newTransaction) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });
      if (!res.ok) throw new Error("保存に失敗しました");
      const savedTransaction = await res.json();

      const completeData = {
        ...savedTransaction,
        category: {
          ...savedTransaction.category,
          category: newTransaction.categoryName,
          type: newTransaction.categoryType,
        },
      };

      setTransactions((prev) => [...prev, completeData]);

      if (navigate) {
        navigate("/list");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (updateItem) => {
    try {
      const res = await fetch(`${API_URL}/${updateItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateItem),
      });
      if (!res.ok) throw new Error("変更に失敗しました");
      const savedItem = await res.json();

      const completeData = {
        ...savedItem,
        category: {
          id: savedItem.category ? updateItem.category.id : null,
          type: updateItem.categoryType,
          category: updateItem.categoryName,
          subCategory: updateItem.category
            ? updateItem.category.subCategory
            : "",
        },
      };
      setTransactions((prev) =>
        prev.map((item) => (item.id === completeData.id ? completeData : item)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("削除に失敗しました");
      setTransactions((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (!transactions) {
    return <div>Loading...</div>;
  }

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
