import QuestionActionTypes from './question.types'
import {
	fetchQuestions,
	upvoteQuestion,
	deUpvoteQuestion,
} from '../../firebase.utils'

const setQuestions = questions => ({
	type: QuestionActionTypes.SET_QUESTIONS,
	payload: questions,
})

const appendQuestions = questions => ({
	type: QuestionActionTypes.APPEND_QUESTIONS,
	payload: questions,
})

const updateQuestion = question => ({
	type: QuestionActionTypes.UPDATE_QUESTION,
	payload: question,
})

const upvoteAndUpdateQuestion = (uid, questionId) => async dispatch => {
	const upvotedQuestion = await upvoteQuestion(uid, questionId)
	if (upvotedQuestion) {
		dispatch(updateQuestion(upvotedQuestion))
	}
}

const deUpvoteAndUpdateQuestion = (uid, questionId) => async dispatch => {
	const deUpvotedQuestion = await deUpvoteQuestion(uid, questionId)
	if (deUpvotedQuestion) {
		dispatch(updateQuestion(deUpvotedQuestion))
	}
}

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
	updateQuestion,
	upvoteAndUpdateQuestion,
	deUpvoteAndUpdateQuestion,
	fetchAndUpdateQuestions,
	fetchNextAndUpdateQuestions,
}
