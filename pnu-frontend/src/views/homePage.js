import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

//**메인 화면
const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <section>
      {user && <UserInfo user={user} />}
      <h1>이 윗쪽의 section 은 Navbar 형태로 구현하였습니다. (components/Navbar)</h1>
      <h1>메인 페이지입니다.</h1>
    </section>
  );
};

export default Home;