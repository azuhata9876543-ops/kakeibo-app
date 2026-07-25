{
  /*登録クラス*/
}
import { useState } from "react";

function TransactionForm({ onCreated }) {
  const [form, setForm] = useState({
    id: 1,
    date: "",
    incExpe: "支出",
    amount: "",
    category: "",
    memo: "",
  });

  const [list, setList] = useState([]);

  const updateForm = (e) => {
    const { name, value } = e.target;
    console.log(`変更された項目：${name},入力値：${value}`);
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      incExpe: type,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      id: form.id,
      date: form.date,
      incExpe: form.incExpe,
      amount: Number(form.amount),
      category: form.category,
      memo: form.memo,
    };

    setList((prevList) => [...prevList, newTransaction]);

    setForm({
      id: form.id + 1,
      date: "",
      incExpe: "支出",
      amount: "",
      category: "",
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
            className={form.incExpe === "収入" ? "active" : ""}
            onClick={() => handleTypeChange("収入")}
          >
            収入
          </button>
          <button
            type="button"
            className={form.incExpe === "支出" ? "active" : ""}
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
          <input
            name="category"
            value={form.category}
            onChange={updateForm}
            placeholder="区分を入力してください"
          />
        </label>

        <label>
          メモ
          <input name="memo" value={form.memo} onChange={updateForm} />
        </label>

        <button type="submit">送信</button>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>収支</th>
              <th>金額</th>
              <th>カテゴリ</th>
              <th>メモ</th>
            </tr>
          </thead>
          <tbody>
            {list.map((f) => (
              <tr key={f.id}>
                <td>{f.date}</td>
                <td>{f.incExpe}</td>
                <td>{f.amount}</td>
                <td>{f.category}</td>
                <td>{f.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default TransactionForm;
