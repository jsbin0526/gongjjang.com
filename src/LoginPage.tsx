import { useState } from "react";
import "./Stylesheet.css";
import { useDispatch } from 'react-redux';
import { loginUser } from './_actions/user_action';

function LoginPage(props: any) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let body = {
      email: Email,
      password: Password
    };
    dispatch(loginUser(body)).then(async (response) => {
      if ((await response.payload).loginSuccess) {
        alert('로그인 성공');
        props.history.push('/');
      } else {
        alert('이메일이나 비밀번호가 올바르지 않습니다');
      }
    });
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }} onSubmit={handleSubmit}>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <label>ID</label>
        <input type="email" name="email" onChange={handleChangeEmail} />
        <label>PASSWORD</label>
        <input type="password" name="password" onChange={handleChangePassword} />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
export default LoginPage