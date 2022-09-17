import { useContext } from "react";
import AuthContext from "../context/AuthContext";

//**로그인 화면
const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <hr />
        <br>
        <label htmlFor="username">PNU webmail</label>
        <input type="text" id="username" placeholder="Enter Username" />
        <label></label>
        <br>
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginPage;