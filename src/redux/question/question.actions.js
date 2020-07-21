import QuestionActionTypes from './question.types'
import { setLoading, unsetLoading } from '../loader/loader.actions'

import {
	fetchQuestion,
	searchQuestions,
	fetchQuestions,
	fetchQuestionsByUid,
	postQuestion,
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

const unsetQuestions = () => ({
	type: QuestionActionTypes.UNSET_QUESTIONS,
})

// thunks

const postQuestionAsync = question => async dispatch => {
	dispatch(setLoading())
	await postQuestion(question)
	dispatch(unsetLoading())
}

const updateQuestionAsync = question => async dispatch => {
	dispatch(setLoading())
	try {
		const updatedQuestion = await updateQuestionFirebase(question)
		dispatch(updateQuestion(updatedQuestion))
	} catch (err) {
		console.log(err)
	}
	dispatch(unsetLoading())
}

const deleteQuestionAsync = questionId => async dispatch => {
	dispatch(setLoading())
	try {
		await deleteQuestionFirebase(questionId)
		dispatch(removeQuestion(questionId))
	} catch (err) {
		console.log(err)
	}
	dispatch(unsetLoading())
}

const upvoteAndUpdateQuestion = (uid, questionId) => async dispatch => {
	dispatch(setLoading())
	const upvotedQuestion = await upvoteQuestion(uid, questionId)
	if (upvotedQuestion) {
		dispatch(updateQuestion(upvotedQuestion))
	}
	dispatch(unsetLoading())
}

const deUpvoteAndUpdateQuestion = (uid, questionId) => async dispatch => {
	dispatch(setLoading())
	const deUpvotedQuestion = await deUpvoteQuestion(uid, questionId)
	if (deUpvotedQuestion) {
		dispatch(updateQuestion(deUpvotedQuestion))
	}
	dispatch(unsetLoading())
}

const searchAndUpdateQuestions = searchTags => async dispatch => {
	dispatch(setLoading())
	dispatch(unsetQuestions())
	const questions = await searchQuestions(searchTags)
	dispatch(setQuestions(questions))
	dispatch(unsetLoading())
}

const fetchAndUpdateQuestion = questionId => async dispatch => {
	dispatch(setLoading())
	dispatch(unsetQuestions())
	const question = await fetchQuestion(questionId)
	if (question) {
		dispatch(setQuestions([question]))
	}
	dispatch(unsetLoading())
	if (question) {
		return question
	}
}

const fetchAndUpdateQuestions = () => async dispatch => {
	dispatch(setLoading())
	dispatch(unsetQuestions())
	const questions = await fetchQuestions()
	dispatch(setQuestions(questions))
	dispatch(unsetLoading())
}

const fetchByUidAndUpdateQuestions = uid => async dispatch => {
	dispatch(setLoading())
	dispatch(unsetQuestions())
	const questions = await fetchQuestionsByUid(uid)
	dispatch(setQuestions(questions))
	dispatch(unsetLoading())
}

const fetchNextAndUpdateQuestions = () => async (dispatch, getState) => {
	dispatch(setLoading())
	const questions = await fetchQuestions(getState().questions.length)
	dispatch(appendQuestions(questions))
	dispatch(unsetLoading())
}

export {
	setQuestions,
	appendQuestions,
	updateQuestion,
	removeQuestion,
	// thunks
	postQuestionAsync,
	updateQuestionAsync,
	deleteQuestionAsync,
	upvoteAndUpdateQuestion,
	deUpvoteAndUpdateQuestion,
	searchAndUpdateQuestions,
	fetchAndUpdateQuestion,
	fetchAndUpdateQuestions,
	fetchByUidAndUpdateQuestions,
	fetchNextAndUpdateQuestions,
}
