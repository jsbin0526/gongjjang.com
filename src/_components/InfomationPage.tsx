// eslint-disable-next-line no-use-before-define
import React, { SetStateAction, useState } from 'react'

function InformationPage (props: any) {
  const info = props.userInfo

  // eslint-disable-next-line no-unused-vars
  const [PasswordChangeToggle, SetPasswordChangeToggle]:[boolean, React.Dispatch<SetStateAction<boolean>>] = useState(Boolean(false))

  return (
    <div>
        <div>이메일: {info.email}</div>
        <div>이름: {info.name}</div>
        <div>성별: {info.sex}</div>
        <div>학교: {info.school}</div>
        <div>학년: {info.grade}</div>
        <div>탐구: {info.option}</div>
        <div></div>
    </div>
  )
}

export default InformationPage
