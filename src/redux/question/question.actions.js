import QuestionActionTypes from './question.types'
import {
	fetchQuestion,
	fetchQuestions,
	fetchQuestionsByUid,
	updateQuestionFirebase,
	deleteQuestionFirebase,
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

const removeQuestion = questionId => ({
	type: QuestionActionTypes.REMOVE_QUESTION,
	payload: questionId,
})

const updateQuestionAsync = question => async dispatch => {
	try {
		const updatedQuestion = await updateQuestionFirebase(question)
		dispatch(updateQuestion(updatedQuestion))
	} catch (err) {
		console.log(err)
	}
}

const deleteQuestionAsync = questionId => async dispatch => {
	try {
		await deleteQuestionFirebase(questionId)
		dispatch(removeQuestion(questionId))
	} catch (err) {
		console.log(err)
	}
}

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

const fetchAndUpdateQuestion = questionId => async dispatch => {
	const question = await fetchQuestion(questionId)
	if (question) {
		dispatch(setQuestions([question]))
		return question
	}
}

const fetchAndUpdateQuestions = () => async dispatch => {
	const questions = await fetchQuestions()
	dispatch(setQuestions(questions))
}

const fetchByUidAndUpdateQuestions = uid => async dispatch => {
	const questions = await fetchQuestionsByUid(uid)
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
	removeQuestion,
	updateQuestionAsync,
	deleteQuestionAsync,
	upvoteAndUpdateQuestion,
	deUpvoteAndUpdateQuestion,
	fetchAndUpdateQuestion,
	fetchAndUpdateQuestions,
	fetchByUidAndUpdateQuestions,
	fetchNextAndUpdateQuestions,
}
