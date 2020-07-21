import AnswerActionTypes from './answer.types'
import { setLoading, unsetLoading } from '../loader/loader.actions'

import {
	postAnswer,
	fetchAnswers,
	fetchAnswersByUid,
	updateAnswerFirebase,
	deleteAnswerFirebase,
	upvoteAnswer,
	deUpvoteAnswer,
} from '../../firebase.utils'

const setAnswers = answers => ({
	type: AnswerActionTypes.SET_ANSWERS,
	payload: answers,
})

const unsetAnswers = () => ({
	type: AnswerActionTypes.UNSET_ANSWERS,
})

const addAnswer = answer => ({
	type: AnswerActionTypes.ADD_ANSWER,
	payload: answer,
})

const updateAnswer = answer => ({
	type: AnswerActionTypes.UPDATE_ANSWER,
	payload: answer,
})

const removeAnswer = answerId => ({
	type: AnswerActionTypes.REMOVE_ANSWER,
	payload: answerId,
})

// thunks

const postAndUpdateAnswer = answer => async dispatch => {
	dispatch(setLoading())
	const answerDoc = await postAnswer(answer)
	if (answerDoc) {
		dispatch(addAnswer(answerDoc))
	}
	dispatch(unsetLoading())
}

const fetchAndUpdateAnswers = questionId => async dispatch => {
	dispatch(setLoading())
	dispatch(unsetAnswers())
	const answers = await fetchAnswers(questionId)
	dispatch(setAnswers(answers))
}

const fetchByUidAndUpdateAnswers = uid => async dispatch => {
	dispatch(setLoading())
	dispatch(unsetAnswers())
	const answers = await fetchAnswersByUid(uid)
	dispatch(setAnswers(answers))
	dispatch(unsetLoading())
}

const updateAnswerAsync = answer => async dispatch => {
	dispatch(setLoading())
	try {
		const updatedAnswer = await updateAnswerFirebase(answer)
		dispatch(updateAnswer(updatedAnswer))
	} catch (err) {
		console.log(err)
	}
	dispatch(unsetLoading())
}

const deleteAnswerAsync = answerId => async dispatch => {
	dispatch(setLoading())
	try {
		await deleteAnswerFirebase(answerId)
		dispatch(removeAnswer(answerId))
	} catch (err) {
		console.log(err)
	}
	dispatch(unsetLoading())
}

const upvoteAndUpdateAnswer = (uid, questionId, answerId) => async dispatch => {
	dispatch(setLoading())
	const upvotedAnswer = await upvoteAnswer(uid, questionId, answerId)
	if (upvotedAnswer) {
		dispatch(updateAnswer(upvotedAnswer))
	}
	dispatch(unsetLoading())
}

const deUpvoteAndUpdateAnswer = (uid, answerId) => async dispatch => {
	dispatch(setLoading())
	const deUpvotedAnswer = await deUpvoteAnswer(uid, answerId)
	if (deUpvotedAnswer) {
		dispatch(updateAnswer(deUpvotedAnswer))
	}
	dispatch(unsetLoading())
}

export {
	setAnswers,
	unsetAnswers,
	addAnswer,
	updateAnswer,
	removeAnswer,
	// thunks
	fetchAndUpdateAnswers,
	fetchByUidAndUpdateAnswers,
	postAndUpdateAnswer,
	updateAnswerAsync,
	deleteAnswerAsync,
	upvoteAndUpdateAnswer,
	deUpvoteAndUpdateAnswer,
}
