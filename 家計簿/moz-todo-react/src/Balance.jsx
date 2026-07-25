{
  /*収支クラス*/
}
import { Link, useNavigate } from "react-router-dom";

function Balance() {
  return (
    <div>
      <Link to="/" className="btn-link danger">
        ログアウト
      </Link>
    </div>
  );
}

export default Balance;
