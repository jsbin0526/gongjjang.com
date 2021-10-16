import axios from 'axios'
import { DIARY_FETCH, DIARY_WRITE, DIARY_DELETE } from './types'
import path from 'path'

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

export async function fetchDiary () {
<<<<<<< Updated upstream
  const request = axios.get('/api/diary/fetch').then((response) => response.data)
=======
  const request = axios.get(`${process.env.REACT_APP_URL}/api/diary/fetch`).then((response) => response.data)
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  const request = axios.post('/api/diary/write', dataToSubmit).then((response) => response.data)
=======
  const request = axios.post(`${process.env.REACT_APP_URL}/api/diary/write`, dataToSubmit).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: DIARY_WRITE,
    payload: request
  }
}

export async function deleteDiary (dataToSubmit: {
  id: string | null
}) {
<<<<<<< Updated upstream
  const request = axios.post('/api/diary/delete', dataToSubmit).then((response) => response.data)
=======
  const request = axios.post(`${process.env.REACT_APP_URL}/api/diary/delete`, dataToSubmit).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: DIARY_DELETE,
    payload: request
  }
}
