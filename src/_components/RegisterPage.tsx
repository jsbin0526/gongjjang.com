import './Register.css';
import { SetStateAction, useState } from 'react';
import { registerUser, overlapCheckEmail } from '../_actions/user_action';
import { useDispatch } from 'react-redux';
import {withRouter} from 'react-router-dom';

function RegisterPage(props: any) {
  const dispatch = useDispatch();

  const [Email, setEmail]:[string,React.Dispatch<SetStateAction<string>>] = useState("")
  const [Password, setPassword]:[string,React.Dispatch<SetStateAction<string>>] = useState("")
  const [ConfirmPassword, setConfirmPassword]:[string,React.Dispatch<SetStateAction<string>>] = useState("")
  const [Name, setName]:[string,React.Dispatch<SetStateAction<string>>] = useState("")
  const [Sex, setSex]:[string,React.Dispatch<SetStateAction<string>>] = useState("남자")
  const [School, setSchool]:[string,React.Dispatch<SetStateAction<string>>] = useState("")
  const [Grade, setGrade]:[string,React.Dispatch<SetStateAction<string>>] = useState("1")
  const [Option, setOption]:[string,React.Dispatch<SetStateAction<string>>] = useState("자연")
  const [IsEmailOverlapChecked, setIsEmailOverlapChecked]:[boolean,React.Dispatch<SetStateAction<boolean>>] = useState(Boolean(false)
  );

  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value)
  }

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const handleChangeName = (event) => {
    setName(event.currentTarget.value)
  }

  const handleChangeSex = (event) => {
    setSex(event.currentTarget.value)
  }

  const handleChangeSchool = (event) => {
    setSchool(event.currentTarget.value);
  }

  const handleChangeGrade = (event) => {
    setGrade(event.currentTarget.value);
  }

  const handleChangeOption = (event) => {
    setOption(event.currentTarget.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인이 다릅니다.');
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
      sex: Sex,
      school: School,
      grade: Grade,
      option: Option
    };

    dispatch(registerUser(body)).then(async (response) => {
      if ((await response.payload).registerSuccess) {
        alert('회원가입 성공');
        props.history.push('/login');
      } else {
        alert('이메일이나 비밀번호가 올바르지 않습니다');
      }
    });
  }

  const handleOverlapCheckEmail = (event) => {
    let regEmail = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    event.preventDefault();


    dispatch(overlapCheckEmail({email: Email})).then(async (response) => {
      if ((await response.payload).overlapCheckEmail && regEmail.test(Email)) {
        alert('해당 이메일은 사용할 수 있습니다');
        setIsEmailOverlapChecked(true);
      } else {
        alert('해당 이메일은 사용할 수 없습니다');
      }
    })
  }

  const cancelEmailInput = (event) => {
    event.preventDefault();

    setIsEmailOverlapChecked(false);
    setEmail("");
  }


  return (<div>
    <form onSubmit={handleSubmit}>
      <div className="had">
        <div className="go_home">
          <a href="/">공짱닷컴</a>
        </div>
        <div className="join">회원가입</div>
      </div>
      <div className="middle">
        <div className="insert">기본 정보 입력</div>
      </div>
      <div className="main">
        <div className="box">
          <div className="insert_id">
            <div className="from_tit">이메일 입력</div>
            <div className="from_txt">
              <input type="email" name="email" maxLength={20} title="이메일 입력" placeholder="이메일를 입력해 주세요." onChange={handleChangeEmail} readOnly={IsEmailOverlapChecked} />
              <button onClick={IsEmailOverlapChecked ? cancelEmailInput : handleOverlapCheckEmail} >{IsEmailOverlapChecked ? "취소" : "중복확인"}</button>
            </div>
          </div>
          <div className="insert_password">
            <div className="from_tit">비밀번호 입력</div>
            <div className="from_txt">
              <input type="password" name="password" maxLength={20} title="비밀번호 입력" placeholder="비밀번호를 입력해 주세요." onChange={handleChangePassword} />
            </div>
          </div>
          <div className="insert_password">
            <div className="from_tit">비밀번호 확인</div>
            <div className="from_txt">
              <input type="password" name="password" maxLength={20} title="비밀번호 확인" placeholder="비밀번호를 입력해 주세요." onChange={handleChangeConfirmPassword} />
            </div>
          </div>
          <div className="insert_name">
            <div className="from_tit">이름 입력</div>
            <div className="from_txt">
              <input type="text" name="name" maxLength={5} title="이름 입력" placeholder="이름을 입력해 주세요." onChange={handleChangeName} />
            </div>
          </div>
          <div className="insert_sex">
            <div className="from_tit">성별 선택</div>
            <div className="from_txt" >
              <input type="radio" name="sex" value="남자" defaultChecked onChange={handleChangeSex} />남자
              <input type="radio" name="sex" value="여자" onChange={handleChangeSex} />여자
            </div>
          </div>
          <div className="insert_school">
            <div className="from_tit">학교 입력</div>
            <div className="from_txt">
              <input type="text" name="school" maxLength={20} title="학교 입력" placeholder="학교를 입력해 주세요." onChange={handleChangeSchool} />
            </div>
          </div>
          <div className="insert_grade">
            <div className="from_tit">학년 입력</div>
            <div className="from_txt" >
              <input type="radio" name="grade" value="1" defaultChecked onChange={handleChangeGrade} />1
              <input type="radio" name="grade" value="2" onChange={handleChangeGrade} />2
              <input type="radio" name="grade" value="3" onChange={handleChangeGrade} />3
            </div>
          </div>
          <div className="insert_option">
            <div className="from_tit">탐구 선택</div>
            <div className="from_txt" >
              <input type="radio" name="option" value="자연" defaultChecked onChange={handleChangeOption} />자연
              <input type="radio" name="option" value="인문" onChange={handleChangeOption} />인문
            </div>
          </div>
        </div>
        <div className="button">
          <button onClick={handleSubmit} disabled={!IsEmailOverlapChecked}>회원가입</button>
        </div>
      </div>
    </form>

  </div>
  );
}

export default withRouter(RegisterPage);