{
  /*登録クラス*/
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TransactionForm({ onCreated }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: "",
    categoryType: "支出",
    amount: "",
    category: "",
    subCategory: "",
    memo: "",
  });

  const CATEGORYNAME = [
    "固定費",
    "食費",
    "日用品・雑費",
    "娯楽・交際費",
    "特別費",
  ];

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
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      date: form.date,
      categoryType: form.categoryType,
      amount: Number(form.amount),
      category: form.category,
      subCategory: form.subCategory,
      memo: form.memo,
    };

    if (typeof onCreated === "function") {
      onCreated(newTransaction);
    }
    setForm({
      date: "",
      categoryType: "支出",
      amount: "",
      category: "",
      subCategory: "",
      memo: "",
    });
    navigate("/list");
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
            className={form.categoryType === "収入" ? "active" : ""}
            onClick={() => handleTypeChange("収入")}
          >
            収入
          </button>
          <button
            type="button"
            className={form.categoryType === "支出" ? "active" : ""}
            onClick={() => handleTypeChange("支出")}
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
            {CATEGORYNAME.map((cat) => (
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
