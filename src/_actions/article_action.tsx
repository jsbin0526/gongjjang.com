import axios from 'axios'
import { ARTICLE_FETCH, ARTICLE_WRITE, ARTICLE_VIEW } from './types'

export async function fetchArticle (dataToSubmit) {
  const request = axios.post('/api/article/fetch', dataToSubmit).then((response) => response.data)
  return {
    type: ARTICLE_FETCH,
    payload: request
  }
}

export async function writeArticle (dataToSubmit) {
  const request = axios.post('/api/article/write', dataToSubmit).then((response) => response.data)
  return {
    type: ARTICLE_WRITE,
    payload: request
  }
}

export async function viewArticle (dataToSubmit) {
  const request = axios.post('/api/article/view', dataToSubmit).then((response) => response.data)
  return {
    type: ARTICLE_VIEW,
    payload: request
  }
}
