{
  /*リストクラス*/
}

function TransactionList() {
  return (
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
  );
}

export default TransactionList;
