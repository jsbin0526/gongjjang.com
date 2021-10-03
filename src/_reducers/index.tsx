import { combineReducers } from 'redux'
import user from './user_reducer'
import diary from './diary_reducer'

const rootReducer = combineReducers({
  user,
  diary
})

export default rootReducer
