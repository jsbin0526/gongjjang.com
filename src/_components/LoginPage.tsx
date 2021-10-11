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
  const [CapsWarning, SetCapsWarning] = useState(false)

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

  const handleKeydown = (keyEvent) => {
    if (keyEvent.getModifierState('CapsLock')) {
      SetCapsWarning(true)
    } else {
      SetCapsWarning(false)
    }
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
        <input type="password" name="password" onChange={handleChangePassword} onKeyDown={handleKeydown} onBlur={(e) => { SetCapsWarning(false) }}/>
        {CapsWarning ? <div><img style={{ width: '50px', height: '50px' }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAXVBMVEX///8BAQEAAADf3998fHy7u7vR0dEWFhZvb2/Z2dmhoaHo6Og5OTkyMjJra2vz8/MNDQ1BQUFGRkbu7u5LS0tubm50dHQRERHCwsJeXl6oqKgZGRmBgYE1NTX39/ecA/ymAAADA0lEQVR4nO3d7XLaMBCFYSxoS9KWAkmcNE16/5dZppPJ2JBgVt49u1rOewGWnj/y18heLBhjjLFobX55z8C4fdnmJu5KV8p371kY9rN0XWrif2Bm4hswL/EdmJU4AOYkjoAZiUfAfMQTYDbicJFJSRytohmJQ+CPxUM+4hh4uLvIRjwGpiOeApMRPwKmIn4MTET8DJiG+DkwCfEcMAXxPDABcQrYPHEa2DjxEmDTxMuADRMvBTZLvBzYKFECbJIoAzZIlAKbI8qBjRFrgE0R64ANEWuBzRDrgY0Q5wCbIM4DNkCcCwxPnA8MTtQAhibqAAMTtYBhiXrAoERNYEiiLjAgURsYjqgPDEa0AIYi2gADEa2AYYh2wCBES2AIoi0wANEa6E60BzoTEUBXIgboSEQB3Yg4oBMRCXQhYoEORDQQTsQDwUQPIJToAwQSvYAwoh8QRPQEQoi+QADRG2hO9AcaEyMATYkxgIbEKEAzYhygETES0IQYC2hAjAZUJ8YDKhOHwHuV6Wm00iMO99GXTb8+20OvBLjdnB9ovVLbET7+UECZTEm4mR5pNK164usIOFn5piRcC8etJu5kA7kJD8Q7CNBPeCDWfF5rLx3GUdiV7V/xKPfiUTyFFcQKoKuwK48y4m56vT5du/WFsllIlpu7m6WkN6K6sDyJpmH4pNhMuFQ64OwolEYhPgqlUYiPQmkU4qNQGoX4KJRGIT4KpVGIj0JpFOKjUBqF+CiURiE+CqVRiI9CaRTio1AahfgolEYhPgqlUYiPQmkU4qNQGoX4KJRGIT4KpVGIj0JpFOKjUBqF+N6FyxuNlr+jCoXbBSf3MwYUakchLgoppNA/tbPEcWGE/cqm3vv/JIwxxhgb9MWqmu9bmZT/qu0arrwppJBC765HqHaWiCos2+dbjZ73UZ/qlz9Kx+vDCq/g3ZPS8SjER6E0CvFRKI1CfBRKoxAfhdIoxHc994fbF5XX9y+vUYX5n9OoRyEuCimk0D+1s8RxYYRfrZL/xIkxxhhjLGn/AIeSRMRk2jEzAAAAAElFTkSuQmCC'/></div> : undefined}
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}
export default withRouter(LoginPage)
