import QuestionActionTypes from './question.types'
import { fetchQuestions } from '../../firebase.utils'

const setQuestions = questions => ({
	type: QuestionActionTypes.SET_QUESTIONS,
	payload: questions,
})

const appendQuestions = questions => ({
	type: QuestionActionTypes.APPEND_QUESTIONS,
	payload: questions,
})

const fetchAndUpdateQuestions = () => async dispatch => {
	const questions = await fetchQuestions()
	dispatch(setQuestions(questions))
}

const fetchNextAndUpdateQuestions = () => async (dispatch, getState) => {
	const questions = await fetchQuestions(getState().questions.length)
	dispatch(appendQuestions(questions))
}

export {
	setQuestions,
	appendQuestions,
	fetchAndUpdateQuestions,
	fetchNextAndUpdateQuestions,
}
