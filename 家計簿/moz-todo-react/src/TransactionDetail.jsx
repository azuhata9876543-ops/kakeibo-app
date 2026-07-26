{
  /*詳細クラス*/
}
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TransactionDetail({ list, onUpdate, onDelete }) {
  const { id } = useParams();
  const transactionId = Number(id);

  const transaction = list.find((l) => l.id === transactionId);

  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(null);
  const [editForm, setEditForm] = useState(transaction || {});

  const CATEGORYNAME = [
    "固定費",
    "食費",
    "日用品・雑費",
    "娯楽・交際費",
    "特別費",
  ];

  if (!transaction) {
    return (
      <>
        <p>該当するデータが見つかりませんでした。</p>
        <button onClick={() => navigate("/list")}>リストに戻る</button>
      </>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onUpdate) {
      const updateData = {
        ...editForm,
        amount: Number(editForm.amount),
      };
      onUpdate(updateData);
      setEditForm(updateData);
    }
    setIsEdit(null);
  };

  const handleChangeDelete = (id) => {
    if (window.confirm("本当に削除しますか？")) {
      if (onDelete) {
        onDelete(id);
      }
      navigate("/list");
    }
  };

  const renderRow = (label, fieldName, type = "text") => {
    const isFieldEdit = isEdit === fieldName;

    return (
      <div>
        <strong>{label}:</strong>
        {isFieldEdit ? (
          <>
            {fieldName === "categoryType" ? (
              <div className="type">
                <button
                  type="button"
                  className={editForm.categoryType === "収入" ? "active" : ""}
                  onClick={() =>
                    setEditForm((prev) => ({ ...prev, categoryType: "収入" }))
                  }
                >
                  収入
                </button>
                <button
                  type="button"
                  className={editForm.categoryType === "支出" ? "active" : ""}
                  onClick={() =>
                    setEditForm((prev) => ({ ...prev, categoryType: "支出" }))
                  }
                >
                  支出
                </button>
              </div>
            ) : fieldName === "category" ? (
              <select
                name="category"
                value={editForm.category || ""}
                onChange={handleChange}
              >
                <option value="">カテゴリを選択してください</option>
                {CATEGORYNAME.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={fieldName}
                value={editForm[fieldName] || ""}
                onChange={handleChange}
              />
            )}

            <button onClick={() => handleSave()}>保存</button>
            <button onClick={() => setIsEdit(null)}>戻る</button>
          </>
        ) : (
          <>
            <strong>
              {transaction[fieldName]}
              {fieldName === "amount" ? "円" : ""}
            </strong>
            <button onClick={() => setIsEdit(fieldName)}>編集</button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="detail">
      {renderRow("日付", "date", "date")}
      {renderRow("収支", "categoryType")}
      {renderRow("金額", "amount", "number")}
      {renderRow("カテゴリ", "category")}
      {renderRow("サブカテゴリ", "subCategory")}
      {renderRow("メモ", "memo")}
      <button
        className="delete"
        onClick={() => handleChangeDelete(transaction.id)}
      >
        削除
      </button>
    </div>
  );
}

export default TransactionDetail;
