{
  /*リストクラス*/
}
import { useNavigate } from "react-router-dom";

function TransactionList({ list = [] }) {
  const navigate = useNavigate();

  //データが一件もなとき表示
  if (list.length === 0) {
    return (
      <div className="card">
        <div className="negative">
          <p className="is-negative">登録されたデータがありません。</p>
          <button
            className="btn entry"
            onClick={() => navigate("/registration")}
          >
            データを登録する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="list">
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>収支</th>
              <th>金額</th>
              <th>カテゴリ</th>
              <th>品目</th>
              <th>メモ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((l) => (
              <tr
                key={l.id}
                className={
                  l.category && l.category.type === "EXPENSE"
                    ? "expense-row"
                    : ""
                }
              >
                <td>{l.date}</td>
                <td>
                  {l.category
                    ? l.category.type === "INCOME"
                      ? "収入"
                      : "支出"
                    : ""}
                </td>
                <td>{Number(l.amount).toLocaleString()}円</td>
                <td>{l.category ? l.category.category : "未分類"}</td>
                <td>{l.item}</td>
                <td>{l.memo}</td>
                <td>
                  <button
                    className="small-btn lis"
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
    </div>
  );
}

export default TransactionList;
