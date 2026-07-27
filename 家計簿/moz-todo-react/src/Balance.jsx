{
  /*収支クラス*/
}
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Balance({ list = [] }) {
  const totalIncome = list
    .filter((item) => item.categoryType === "収入")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = list
    .filter((item) => item.categoryType === "支出")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const categoryMap = {};

  list
    .filter((item) => item.categoryType === "支出")
    .forEach((item) => {
      const name = item.category || "未分類";
      if (!categoryMap[name]) {
        categoryMap[name] = 0;
      }
      categoryMap[name] += item.amount;
    });

  const charData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = [
    "#007bff",
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#17a2b8",
    "#6c757d",
    "#6f42c1",
    "#e83e8c",
  ];

  return (
    <div>
      <div>
        {charData.length === 0 ? (
          <p>支出データがないため、グラフを表示できません。</p>
        ) : (
          <div
            style={{
              width: "100%",
              height: 300,
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={charData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {charData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toLocaleString()}円`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div>
        <div>
          <h3>総収入</h3>
          <p>{totalIncome.toLocaleString()}円</p>
        </div>
        <div>
          <h3>総支出</h3>
          <p>{totalExpense.toLocaleString()}円</p>
        </div>
        <div>
          <h3>現在の残高</h3>
          <p>{totalBalance.toLocaleString()}円</p>
        </div>
      </div>

      <Link to="/" className="btn-link danger">
        ログアウト
      </Link>
    </div>
  );
}

export default Balance;
