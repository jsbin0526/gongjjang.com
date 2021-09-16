import React from 'react';

class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <div className="nav">
                    <div className="title">
                        공짱닷컴
                    </div>
                </div>
                <div className="menu">
                    <div className="menu_content">
                        <div className="nav-item">내 정보</div>
                        <div className="nav-item">다이어리</div>
                        <div className="nav-item">커뮤니티</div>
                        <div className="login-wrap">
                            <a className="nav-item" href="login">로그인</a>
                            <a className="nav-item" href="register">회원가입</a>
                        </div>
                    </div>
                </div>
                <main id="container">
                </main>
            </div>
        )
    }
}

export default LandingPage