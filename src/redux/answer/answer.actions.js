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
} from '../../firebase/methods/firebase.answer.methods'

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

const appendAnswers = answers => ({
	type: AnswerActionTypes.APPEND_ANSWERS,
	payload: answers,
})

const setAllLoaded = allLoaded => ({
	type: AnswerActionTypes.ALL_LOADED,
	payload: allLoaded,
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
	const { answers, allLoaded } = await fetchAnswers(questionId)
	dispatch(setAnswers(answers))
	dispatch(setAllLoaded(allLoaded))
	dispatch(unsetLoading())
}

const fetchNextAndUpdateAnswers = questionId => async (dispatch, getState) => {
	dispatch(setLoading())
	const { answers, allLoaded } = await fetchAnswers(
		questionId,
		getState().answers.answers.length
	)
	dispatch(appendAnswers(answers))
	dispatch(setAllLoaded(allLoaded))
	dispatch(unsetLoading())
}

const fetchByUidAndUpdateAnswers = uid => async dispatch => {
	dispatch(setLoading())
	dispatch(unsetAnswers())
	const { answers, allLoaded } = await fetchAnswersByUid(uid)
	dispatch(setAnswers(answers))

	dispatch(setAllLoaded(allLoaded))
	dispatch(unsetLoading())
}

const fetchNextByUidAndUpdateAnswers = uid => async (dispatch, getState) => {
	dispatch(setLoading())
	const { answers, allLoaded } = await fetchAnswersByUid(
		uid,
		getState().answers.answers.length
	)
	dispatch(appendAnswers(answers))
	dispatch(setAllLoaded(allLoaded))
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
	fetchNextAndUpdateAnswers,
	fetchByUidAndUpdateAnswers,
	fetchNextByUidAndUpdateAnswers,
	postAndUpdateAnswer,
	updateAnswerAsync,
	deleteAnswerAsync,
	upvoteAndUpdateAnswer,
	deUpvoteAndUpdateAnswer,
}
