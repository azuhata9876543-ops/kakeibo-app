import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  let pageTitle = "ログイン";
  let pageLink = null;
  if (location.pathname === "/top") {
    pageTitle = "トップページ";
    pageLink = (
      <>
        <Link to="/list" className="btn-link">
          リスト
        </Link>
        <Link to="/registration" className="btn-link">
          登録
        </Link>
      </>
    );
  } else if (location.pathname === "/list") {
    pageTitle = "リスト";
    pageLink = (
      <>
        <Link to="/top" className="btn-link">
          トップページ
        </Link>
        <Link to="/registration" className="btn-link">
          登録
        </Link>
      </>
    );
  } else if (location.pathname === "/registration") {
    pageTitle = "登録画面";
    pageLink = (
      <>
        <Link to="/top" className="btn-link">
          トップページ
        </Link>
        <Link to="/list" className="btn-link">
          リスト
        </Link>
      </>
    );
  }

  return (
    <header>
      <h3>{pageTitle}</h3>
      {pageLink}
    </header>
  );
}

export default Header;
