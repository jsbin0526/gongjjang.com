import { useState } from "react";
import "./Stylesheet.css";
import {useDispatch} from 'react-redux';
import {loginUser} from './_actions/user_action';

function LoginPage(props: any) {
  const dispatch = useDispatch();
  const [Id, setId] = useState("")
  const [Password, setPassword] = useState("")

  const handleChangeId = (event) => {
    setId(event.currentTarget.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let body = {
      id: Id,
      password: Password
    }

    dispatch(loginUser(body));
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }} onSubmit = {handleSubmit}>
        <form style={{display:'flex', flexDirection:'column'}}>
          <label>ID</label>
          <input type="text" name="id"onChange={handleChangeId} />
          <label>PASSWORD</label>
          <input type="password" name="password"onChange={handleChangePassword} />
          <br/>
          <button type="submit">로그인</button>
        </form>
    </div>
  );
}
export default LoginPage