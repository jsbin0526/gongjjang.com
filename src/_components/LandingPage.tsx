import { withRouter } from 'react-router-dom'
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../_actions/user_action'
import InformationPage from './InfomationPage'
import EmptyPage from './EmptyPage'
import DiaryPage from './DiaryPage'
import CommunityPage from './CommunityPage'

function LandingPage (props: any) {
  const dispatch = useDispatch()
  const [HomePageComponent, SetHomePageComponent] = useState(EmptyPage)

  // eslint-disable-next-line no-undef
  const handleHomePage = (component: React.SetStateAction<JSX.Element>) => {
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

  const alertLogin = (event: React.MouseEvent) => {
    alert('로그인 후에 이용해주세요')
    props.history.push('/login')
    event.preventDefault()
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
                        <div className="nav-item"><a href="/" onClick={(props.payload !== undefined ? props.payload.isAuth : false) ? handleHomePage(<InformationPage userInfo={props.payload}/>) : alertLogin}>내 정보</a></div>
                        <div className="nav-item"><a href="/" onClick={(props.payload !== undefined ? props.payload.isAuth : false) ? handleHomePage(<DiaryPage userInfo={props.payload}/>) : alertLogin}>다이어리</a></div>
                        <div className="nav-item"><a href="/" onClick={(props.payload !== undefined ? props.payload.isAuth : false) ? handleHomePage(<CommunityPage userInfo={props.payload}/>) : alertLogin}>커뮤니티</a></div>
                        <div className="login-wrap">
                            <a className="nav-item" href={(props.payload !== undefined ? !props.payload.isAuth : false) ? '/login' : '/'} onClick={(props.payload !== undefined ? props.payload.isAuth : false) ? handleLogout : undefined} >{(props.payload !== undefined ? props.payload.isAuth : false) ? '로그아웃' : '로그인'}</a>
                            {(props.payload !== undefined ? props.payload.isAuth : false) ? <div></div> : <a className="nav-item " href="register">회원가입</a>}
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
