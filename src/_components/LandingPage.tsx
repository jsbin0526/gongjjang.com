import { withRouter } from 'react-router-dom'
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../_actions/user_action'
import InformationPage from './InfomationPage'
import EmptyPage from './EmptyPage'

function LandingPage (props: any) {
  const dispatch = useDispatch()
  const [HomePageComponent, SetHomePageComponent] = useState(EmptyPage)

  const handleHomePage = (component) => {
    return (event: React.MouseEvent) => {
      SetHomePageComponent(component)
      event.preventDefault()
    }
  }
  const handleLogout = () => {
    dispatch(logoutUser()).then(async (response) => {
      if ((await response.payload).logoutSuccess) {
        props.history.push('/')
      } else {
        alert('로그아웃 하는데 실패했습니다')
      }
    })
    SetHomePageComponent(EmptyPage)
  }

  return (
            <div>
                <div className="nav">
                    <div className="title">
                        공짱닷컴
                    </div>
                </div>
                <div className="menu">
                    <div className="menu_content">
                        <div className="nav-item"><a href="/" onClick={(props.payload !== undefined ? props.payload.isAuth : false) ? handleHomePage(<InformationPage userInfo={props.payload}/>) : undefined}>내 정보</a></div>
                        <div className="nav-item">다이어리</div>
                        <div className="nav-item">커뮤니티</div>
                        <div className="login-wrap">
                            <a className="nav-item" href={(props.payload !== undefined ? !props.payload.isAuth : false) ? 'login' : '/'} onClick={(props.payload !== undefined ? props.payload.isAuth : false) ? handleLogout : undefined} >{(props.payload !== undefined ? props.payload.isAuth : false) ? '로그아웃' : '로그인'}</a>
                            <a className="nav-item" href="register">회원가입</a>
                        </div>
                    </div>
                </div>
                <main id="container">
                    {HomePageComponent}
                </main>
            </div>
  )
}

export default withRouter(LandingPage)
