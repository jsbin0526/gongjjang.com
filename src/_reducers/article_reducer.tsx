import { ARTICLE_FETCH, ARTICLE_WRITE, ARTICLE_VIEW } from '../_actions/types'

export default function community (state = {}, action) {
  switch (action.type) {
    case ARTICLE_FETCH:
      return { ...state, fetchResults: action.payload }
    case ARTICLE_WRITE:
      return { ...state, writeSuccess: action.payload }
    case ARTICLE_VIEW:
      return { ...state, viewResults: action.payload }
  }
}
