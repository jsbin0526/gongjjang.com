import axios from 'axios'
import { ARTICLE_FETCH, ARTICLE_WRITE, ARTICLE_VIEW } from './types'

export async function fetchArticle (dataToSubmit) {
<<<<<<< Updated upstream
  const request = axios.post('/api/article/fetch', dataToSubmit).then((response) => response.data)
=======
  const request = axios.post(`${process.env.REACT_APP_URL}/api/article/fetch`, dataToSubmit).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: ARTICLE_FETCH,
    payload: request
  }
}

export async function writeArticle (dataToSubmit) {
<<<<<<< Updated upstream
  const request = axios.post('/api/article/write', dataToSubmit).then((response) => response.data)
=======
  const request = axios.post(`${process.env.REACT_APP_URL}/api/article/write`, dataToSubmit).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: ARTICLE_WRITE,
    payload: request
  }
}

export async function viewArticle (dataToSubmit) {
<<<<<<< Updated upstream
  const request = axios.post('/api/article/view', dataToSubmit).then((response) => response.data)
=======
  const request = axios.post(`${process.env.REACT_APP_URL}/api/article/view`, dataToSubmit).then((response) => response.data)
>>>>>>> Stashed changes
  return {
    type: ARTICLE_VIEW,
    payload: request
  }
}
