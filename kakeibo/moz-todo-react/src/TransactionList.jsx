{
  /*リストクラス*/
}
import { useNavigate } from "react-router-dom";

function TransactionList({ list = [] }) {
  const navigate = useNavigate();

  //データが一件もなとき表示
  if (list.length === 0) {
    return (
      <div className="list">
        <p>登録されたデータがありません。</p>
        <button onClick={() => navigate("/registration")}>
          データを登録する
        </button>
      </div>
    );
  }

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>収支</th>
            <th>金額</th>
            <th>カテゴリ</th>
            <th>メモ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((l) => (
            <tr key={l.id}>
              <td>{l.date}</td>
              <td>
                {l.category
                  ? l.category.type === "INCOME"
                    ? "収入"
                    : "支出"
                  : ""}
              </td>
              <td>{l.amount}</td>
              <td>{l.category ? l.category.category : "未分類"}</td>
              <td>{l.subCategory}</td>
              <td>{l.memo}</td>
              <td>
                <button
                  type="button"
                  onClick={() => navigate(`/detail/${l.id}`)}
                >
                  詳細
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
