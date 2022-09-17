import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";


//학과 탭 추가해주세요 major
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, passwordcheck);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <div>
          <label htmlFor="username">부산대 이메일</label>
          <input
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input
            type="password"
            id="confirm-password"
            onChange={e => setPasswordcheck(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p>{passwordcheck !== password ? "비밀번호가 일치하지 않습니다." : ""}</p>
        </div>
        <button>계정 생성하기</button>
      </form>
    </section>
  );
}

export default Register;