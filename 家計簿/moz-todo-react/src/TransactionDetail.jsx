{
  /*詳細クラス*/
}

function TransactionDetail({ list }) {
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
          </tr>
        </thead>
        <tbody>
          {list.map((l) => (
            <tr key={l.id}>
              <td>{l.date}</td>
              <td>{l.incExpe}</td>
              <td>{l.amount}</td>
              <td>{l.category}</td>
              <td>{l.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionDetail;
