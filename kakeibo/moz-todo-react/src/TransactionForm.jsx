{
  /*登録クラス*/
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORYNAME = {
  INCOME: ["給与", "副収入"],
  EXPENSE: [
    "固定費",
    "食費",
    "日用品",
    "医療",
    "装飾",
    "車",
    "特別費",
    "その他",
  ],
};

const categoryMap = {
  給与: 1,
  副収入: 2,
  固定費: 3,
  食費: 4,
  日用品: 5,
  医療: 6,
  装飾: 7,
  車: 8,
  特別費: 9,
  その他: 10,
};

function TransactionForm({ onCreated }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    categoryType: "EXPENSE",
    amount: "",
    category: "",
    subCategory: "",
    memo: "",
  });

  const updateForm = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      categoryType: type,
      category: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedId = categoryMap[form.category] || null;

    const newTransaction = {
      date: form.date,
      amount: Number(form.amount),
      memo: form.memo,
      category: selectedId
        ? { id: selectedId, subCategory: form.subCategory }
        : null,
      categoryName: form.category,
      categoryType: form.categoryType,
    };

    if (typeof onCreated === "function") {
      onCreated(newTransaction, navigate);
    }
    setForm({
      date: "",
      categoryType: "EXPENSE",
      amount: "",
      category: "",
      subCategory: "",
      memo: "",
    });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label>日付を選択してください</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={updateForm}
          required
        />

        <div className="type-buttons">
          <button
            type="button"
            className={form.categoryType === "INCOME" ? "active" : ""}
            onClick={() => handleTypeChange("INCOME")}
          >
            収入
          </button>
          <button
            type="button"
            className={form.categoryType === "EXPENSE" ? "active" : ""}
            onClick={() => handleTypeChange("EXPENSE")}
          >
            支出
          </button>
        </div>

        <label>
          金額入力
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={updateForm}
            placeholder="金額を入力してください"
            required
          />
        </label>

        <label>
          カテゴリ
          <select name="category" value={form.category} onChange={updateForm}>
            <option value="">カテゴリを選択してください</option>
            {CATEGORYNAME[form.categoryType].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          サブカテゴリ
          <input
            name="subCategory"
            value={form.subCategory}
            onChange={updateForm}
            placeholder="カテゴリを入力してください"
          />
        </label>

        <label>
          メモ
          <input name="memo" value={form.memo} onChange={updateForm} />
        </label>

        <button type="submit">送信</button>
      </form>
    </>
  );
}
export default TransactionForm;
