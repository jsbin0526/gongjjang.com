import axios from 'axios'
import { DIARY_FETCH, DIARY_WRITE, DIARY_DELETE } from './types'

export async function fetchDiary () {
  const request = axios.get('https://gongjjang.herokuapp.com/api/diary/fetch', { withCredentials: true }).then((response) => response.data)
  return {
    type: DIARY_FETCH,
    payload: request
  }
}

export async function writeDiary (dataToSubmit: {
  title: string,
  body: string,
  author: string,
  date: string
}) {
  const request = axios.post('https://gongjjang.herokuapp.com/api/diary/write', dataToSubmit, { withCredentials: true }).then((response) => response.data)
  return {
    type: DIARY_WRITE,
    payload: request
  }
}

export async function deleteDiary (dataToSubmit: {
  id: string | null
}) {
  const request = axios.post('https://gongjjang.herokuapp.com/api/diary/delete', dataToSubmit, { withCredentials: true }).then((response) => response.data)
  return {
    type: DIARY_DELETE,
    payload: request
  }
}
