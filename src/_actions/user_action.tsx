import axios from 'axios'
import { LOGIN_USER, REGISTER_USER, OVERLAP_CHECK_EMAIL, AUTH_USER, LOGOUT_USER, PASSWORD_CHANGE } from './types'
import path from 'path'

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

export async function loginUser (dataToSubmit : {
  email: string,
  password: string
}) {
<<<<<<< Updated upstream
  const request = axios.post('/api/user/login', dataToSubmit).then((response) => response.data)
=======
  const request = axios.post('https://gongjjang.herokuapp.com/api/user/login', dataToSubmit).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export async function registerUser (dataToSubmit: {
    email: string;
    password: string;
    name: string;
    sex: string;
    school: string;
    grade: string;
    option: string;
}) {
<<<<<<< Updated upstream
  const request = axios.post('/api/user/register', dataToSubmit).then((response) => response.data)
=======
  const request = axios.post(`${process.env.REACT_APP_URL}/api/user/register`, dataToSubmit).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: REGISTER_USER,
    payload: request
  }
}

export async function overlapCheckEmail (dataToSubmit: { email: string }) {
<<<<<<< Updated upstream
  const request = axios.post('/api/user/overlapCheckEmail', dataToSubmit).then((response) => response.data)
=======
  const request = axios.post(`${process.env.REACT_APP_URL}/api/user/overlapCheckEmail`, dataToSubmit).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: OVERLAP_CHECK_EMAIL,
    payload: request
  }
}

export async function authUser () {
<<<<<<< Updated upstream
  const request = axios.get('/api/user/auth').then((response) => response.data)
=======
  const request = axios.get(`${process.env.REACT_APP_URL}/api/user/auth`).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: AUTH_USER,
    payload: request
  }
}

export async function logoutUser () {
<<<<<<< Updated upstream
  const request = axios.get('/api/user/logout').then((response) => response.data)
=======
  const request = axios.get(`${process.env.REACT_APP_URL}/api/user/logout`).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: LOGOUT_USER,
    payload: request
  }
}

export async function passwordChange (dataToSubmit: {
  email: string,
  password: string
}) {
<<<<<<< Updated upstream
  const request = axios.post('/api/user/passwordChange', dataToSubmit).then((response) => response.data)
=======
  const request = axios.post(`${process.env.REACT_APP_URL}/api/user/passwordChange`, dataToSubmit).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: PASSWORD_CHANGE,
    payload: request
  }
}