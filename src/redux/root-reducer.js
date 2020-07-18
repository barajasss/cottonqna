import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import questionReducer from './question/question.reducer'

const rootReducer = combineReducers({
	user: userReducer,
	questions: questionReducer,
})

export default rootReducer
