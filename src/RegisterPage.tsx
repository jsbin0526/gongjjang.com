import './Register.css';
import {useState} from 'react';
import { registerUser } from './_actions/user_action';
import { useDispatch } from 'react-redux';

function RegisterPage() {
  const dispatch = useDispatch();
  
  const [Id, setId] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [Name, setName] = useState("")
  const [Sex, setSex] = useState("남자")
  const [School, setSchool] = useState("")
  const [Grade, setGrade] = useState("1")
  const [Option, setOption] = useState("자연")

  const handleChangeId = (event) => {
    setId(event.currentTarget.value)
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
    setSchool(event.currentTarget.value)
  }

  const handleChangeGrade = (event) => {
    setGrade(event.currentTarget.value)
  }

  const handleChangeOption = (event) => {
    setOption(event.currentTarget.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인이 다릅니다.');
    }

    let body = {
      id: Id,
      password: Password,
      name: Name,
      sex: Sex,
      school: School,
      grade: Grade,
      option: Option
    }

    dispatch(registerUser(body))
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
            <div className="from_tit">아이디 입력</div>
            <div className="from_txt">
              <input type="text" name="id" maxLength={20} title="아이디 입력" placeholder="아이디를 입력해 주세요." onChange={handleChangeId} />
            </div>
          </div>
          <div className="insert_password">
            <div className="from_tit">비밀번호 입력</div>
            <div className="from_txt">
              <input type="text" name="password" maxLength={20} title="비밀번호 입력" placeholder="비밀번호를 입력해 주세요." onChange={handleChangePassword}/>
            </div>
          </div>
          <div className="insert_password">
            <div className="from_tit">비밀번호 확인</div>
            <div className="from_txt">
              <input type="text" name="password" maxLength={20} title="비밀번호 확인" placeholder="비밀번호를 입력해 주세요." onChange={handleChangeConfirmPassword}/>
            </div>
          </div>
          <div className="insert_name">
            <div className="from_tit">이름 입력</div>
            <div className="from_txt">
              <input type="text" name="name" maxLength={5} title="이름 입력" placeholder="이름을 입력해 주세요." onChange={handleChangeName}/>
            </div>
          </div>
          <div className="insert_sex">
            <div className="from_tit">성별 선택</div>
            <div className="from_txt" onChange={handleChangeSex}>
              <input type="radio" name="sex" defaultValue="남자" defaultChecked />남자
              <input type="radio" name="sex" defaultValue="여자" />여자
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
            <div className="from_txt" onChange={handleChangeGrade}>
              <input type="radio" name="grade" defaultValue={1} defaultChecked />1
              <input type="radio" name="grade" defaultValue={2} />2
              <input type="radio" name="grade" defaultValue={3} />3
            </div>
          </div>
          <div className="insert_option">
            <div className="from_tit">탐구 선택</div>
            <div className="from_txt" onChange={handleChangeOption}>
              <input type="radio" name="option" defaultValue="과학" defaultChecked />자연
              <input type="radio" name="option" defaultValue="사회" />인문
            </div>
          </div>
        </div>
        <div className="button">
          <button type="submit">회원가입</button>
        </div>
      </div>
    </form>

  </div>
  );
}

export default RegisterPage;