// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { passwordChange } from '../_actions/user_action'

function InformationPage (props: any) {
  const dispatch = useDispatch()
  const info = props.userInfo

  // eslint-disable-next-line no-unused-vars
  const [Password, SetPassword] = useState('')

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const body = {
      email: info.email,
      password: Password
    }

    dispatch(passwordChange(body)).then(async (response) => {
      if ((await response.payload).passwordChangeSuccess) {
        alert('비밀번호가 변경되었습니다')
      } else {
        alert('비밀번호 변경에 실패했습니다')
      }
    })
    event.preventDefault()
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    SetPassword(event.currentTarget.value)
  }

  return (
    <div>
        <div>이메일: {info.email}</div>
        <div>이름: {info.name}</div>
        <div>성별: {info.sex}</div>
        <div>학교: {info.school}</div>
        <div>학년: {info.grade}</div>
        <div>탐구: {info.option}</div>
        <div>
          <form onSubmit={handlePasswordSubmit}>
            <br/>
            <input type="password" id="passwordChange" onChange={handleChangePassword}/>
            <br/>
            <button type="submit" value="Submit">비밀번호 변경</button>
          </form>
        </div>
    </div>
  )
}

export default withRouter(InformationPage)
