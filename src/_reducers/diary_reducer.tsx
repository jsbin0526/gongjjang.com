import { DIARY_DELETE, DIARY_FETCH, DIARY_WRITE } from '../_actions/types'

export default function diary (state = {}, action) {
  switch (action.type) {
    case DIARY_FETCH:
      return { ...state, fetchResults: action.payload }
    case DIARY_WRITE:
      return { ...state, writeSuccess: action.payload }
    case DIARY_DELETE:
      return { ...state, deleteSuccess: action.payload }
    default:
      return state
  }
}
