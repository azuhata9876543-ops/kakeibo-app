import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  return (
    <>
      <h1>家計簿</h1>
      <form>
        <label>
          ユーザー名
          <input name="loginId" placeholder="ログインIDを入力してください" />
        </label>

        <label>
          パスワード
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="パスワードを入力してください"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "非表示" : "表示"}
          </button>
        </label>

        <button type="submit">ログイン</button>
      </form>
    </>
  );
}

export default Login;
