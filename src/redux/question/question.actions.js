import QuestionActionTypes from './question.types'
import { setLoading, unsetLoading } from '../loader/loader.actions'
import firebase from '../../firebase/firebase'

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
} from '../../firebase/methods/firebase.question.methods'

const setQuestions = questions => ({
	type: QuestionActionTypes.SET_QUESTIONS,
	payload: questions,
})

const appendQuestions = questions => ({
	type: QuestionActionTypes.APPEND_QUESTIONS,
	payload: questions,
})

const setAllLoaded = allLoaded => ({
	type: QuestionActionTypes.SET_ALL_LOADED,
	payload: allLoaded,
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

const updateQuestionAsync = question => async (dispatch, getState) => {
	dispatch(setLoading())
	try {
		const updatedQuestion = await updateQuestionFirebase(question)
		dispatch(updateQuestion(updatedQuestion))
	} catch (err) {
		console.log(err)
	}
	dispatch(unsetLoading())
}

const deleteQuestionAsync = questionId => async (dispatch, getState) => {
	dispatch(setLoading())
	try {
		await deleteQuestionFirebase(questionId)
		dispatch(removeQuestion(questionId))
		if (!getState().questions.allLoaded) {
			const { questions, allLoaded } = await fetchQuestionsByUid(
				firebase.auth().currentUser.uid,
				getState().questions.questions.length,
				1
			)
			dispatch(appendQuestions(questions))
			dispatch(setAllLoaded(allLoaded))
		}
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

const searchNextAndUpdateQuestions = searchTags => async (
	dispatch,
	getState
) => {
	dispatch(setLoading())
	const questions = await searchQuestions(
		searchTags,
		getState().questions.length
	)
	dispatch(appendQuestions(questions))
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
	const { questions, allLoaded } = await fetchQuestions()
	dispatch(setQuestions(questions))
	dispatch(setAllLoaded(allLoaded))
	dispatch(unsetLoading())
}

const fetchNextAndUpdateQuestions = () => async (dispatch, getState) => {
	dispatch(setLoading())
	const { questions, allLoaded } = await fetchQuestions(
		getState().questions.questions.length
	)
	dispatch(appendQuestions(questions))
	dispatch(setAllLoaded(allLoaded))
	dispatch(unsetLoading())
}

const fetchByUidAndUpdateQuestions = uid => async dispatch => {
	dispatch(setLoading())
	dispatch(unsetQuestions())
	const { questions, allLoaded } = await fetchQuestionsByUid(uid)
	dispatch(setQuestions(questions))
	dispatch(setAllLoaded(allLoaded))
	dispatch(unsetLoading())
}

const fetchNextByUidAndUpdateQuestions = uid => async (dispatch, getState) => {
	dispatch(setLoading())
	const { questions, allLoaded } = await fetchQuestionsByUid(
		uid,
		getState().questions.questions.length
	)
	dispatch(appendQuestions(questions))
	dispatch(setAllLoaded(allLoaded))
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
	searchNextAndUpdateQuestions,
	fetchAndUpdateQuestion,
	fetchAndUpdateQuestions,
	fetchNextAndUpdateQuestions,
	fetchByUidAndUpdateQuestions,
	fetchNextByUidAndUpdateQuestions,
}
