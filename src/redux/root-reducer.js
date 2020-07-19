import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import questionReducer from './question/question.reducer'
import answerReducer from './answer/answer.reducer'

const rootReducer = combineReducers({
	user: userReducer,
	questions: questionReducer,
	answers: answerReducer,
})

export default rootReducer
