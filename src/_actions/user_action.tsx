import axios from 'axios'
import { LOGIN_USER, REGISTER_USER, OVERLAP_CHECK_EMAIL, AUTH_USER, LOGOUT_USER, PASSWORD_CHANGE } from './types'

export async function loginUser (dataToSubmit : {
  email: string,
  password: string
}) {
  const request = axios.post('/api/user/login', dataToSubmit).then((response) => response.data)
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
  const request = axios.post('/api/user/register', dataToSubmit).then((response) => response.data)
  return {
    type: REGISTER_USER,
    payload: request
  }
}

export async function overlapCheckEmail (dataToSubmit: { email: string }) {
  const request = axios.post('/api/user/overlapCheckEmail', dataToSubmit).then((response) => response.data)
  return {
    type: OVERLAP_CHECK_EMAIL,
    payload: request
  }
}

export async function authUser () {
  const request = axios.get('/api/user/auth').then((response) => response.data)
  return {
    type: AUTH_USER,
    payload: request
  }
}

export async function logoutUser () {
  const request = axios.get('/api/user/logout').then((response) => response.data)
  return {
    type: LOGOUT_USER,
    payload: request
  }
}

export async function passwordChange (dataToSubmit: {
  email: string,
  password: string
}) {
  const request = axios.post('/api/user/passwordChange', dataToSubmit).then((response) => response.data)
  return {
    type: PASSWORD_CHANGE,
    payload: request
  }
}
