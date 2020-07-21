import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import questionReducer from './question/question.reducer'
import answerReducer from './answer/answer.reducer'
import loaderReducer from './loader/loader.reducer'

const rootReducer = combineReducers({
	user: userReducer,
	questions: questionReducer,
	answers: answerReducer,
	isLoading: loaderReducer,
})

export default rootReducer
