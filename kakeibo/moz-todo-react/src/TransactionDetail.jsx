{
  /*詳細クラス*/
}
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

const CATEGORYMAP = {
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

function TransactionDetail({ list, onUpdate, onDelete }) {
  const { id } = useParams();
  const transactionId = Number(id);

  const transaction = list.find((l) => l.id === transactionId);

  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(null);
  const [editForm, setEditForm] = useState(() => {
    if (!transaction) return {};
    return {
      id: transaction.id,
      date: transaction.date,
      categoryType: transaction.category
        ? transaction.category.type
        : "EXPENSE",
      amount: transaction.amount,
      category: transaction.category ? transaction.category.category : "",
      subCategory: transaction.category
        ? transaction.category.subCategory || ""
        : "",
      memo: transaction.memo,
    };
  });

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

  const handleTypeChange = (type) => {
    const defaultCategory = CATEGORYNAME[type][0];

    setEditForm((prev) => ({
      ...prev,
      categoryType: type,
      category: defaultCategory,
    }));
  };

  const handleSave = () => {
    if (onUpdate) {
      const selectedId = CATEGORYMAP[editForm.category] || null;
      const updateData = {
        id: editForm.id,
        date: editForm.date,

        memo: editForm.memo,
        amount: Number(editForm.amount),
        category: selectedId
          ? {
              id: selectedId,
              type: editForm.categoryType,
              category: editForm.category,
              subCategory: editForm.subCategory,
            }
          : null,
        categoryName: editForm.category,
        categoryType: editForm.categoryType,
      };
      onUpdate(updateData);
      setEditForm({
        ...editForm,
        amount: Number(editForm.amount),
        category: editForm.category,
        categoryType: editForm.categoryType,
        subCategory: editForm.subCategory,
      });
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

    let displayValue = editForm[fieldName];
    if (fieldName === "categoryType") {
      displayValue = editForm.categoryType === "INCOME" ? "収入" : "支出";
    }
    if (fieldName === "category") {
      displayValue = editForm.category ? editForm.category : "未分類";
    }

    if (fieldName === "subCategory") {
      displayValue = editForm.subCategory || "未入力";
    }

    return (
      <div>
        <strong>{label}:</strong>
        {isFieldEdit ? (
          <>
            {fieldName === "categoryType" ? (
              <div className="type">
                <button
                  type="button"
                  className={editForm.categoryType === "INCOME" ? "active" : ""}
                  onClick={() => handleTypeChange("INCOME")}
                >
                  収入
                </button>
                <button
                  type="button"
                  className={
                    editForm.categoryType === "EXPENSE" ? "active" : ""
                  }
                  onClick={() => handleTypeChange("EXPENSE")}
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
                {CATEGORYNAME[editForm.categoryType].map((cat) => (
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
              {""}
              {displayValue}
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
