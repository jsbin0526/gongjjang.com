// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import './Stylesheet.css'
import { useDispatch } from 'react-redux'
import { loginUser } from '../_actions/user_action'
import { withRouter } from 'react-router-dom'

function LoginPage (props: any) {
  const dispatch = useDispatch()
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const body = {
      email: Email,
      password: Password
    }
    dispatch(loginUser(body)).then(async (response) => {
      if ((await response.payload).loginSuccess) {
        alert('로그인 성공')
        props.history.push('/')
      } else {
        alert('이메일이나 비밀번호가 올바르지 않습니다')
      }
    })
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
    }} onSubmit={handleSubmit}>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <label>아이디</label>
        <input type="email" name="email" onChange={handleChangeEmail} />
        <br/>
        <label>비밀번호</label>
        <input type="password" name="password" onChange={handleChangePassword} />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}
export default withRouter(LoginPage)
