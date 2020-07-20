import AnswerActionTypes from './answer.types'

import {
	fetchAnswers,
	postAnswer,
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

const fetchAndUpdateAnswers = questionId => async dispatch => {
	const answers = await fetchAnswers(questionId)
	dispatch(setAnswers(answers))
}

const postAndUpdateAnswer = answer => async dispatch => {
	const answerDoc = await postAnswer(answer)
	if (answerDoc) {
		dispatch(addAnswer(answerDoc))
	}
}

const updateAnswerAsync = answer => async dispatch => {
	try {
		const updatedAnswer = await updateAnswerFirebase(answer)
		dispatch(updateAnswer(updatedAnswer))
	} catch (err) {
		console.log(err)
	}
}

const deleteAnswerAsync = answerId => async dispatch => {
	try {
		await deleteAnswerFirebase(answerId)
		dispatch(removeAnswer(answerId))
	} catch (err) {
		console.log(err)
	}
}

const upvoteAndUpdateAnswer = (uid, questionId, answerId) => async dispatch => {
	const upvotedAnswer = await upvoteAnswer(uid, questionId, answerId)
	if (upvotedAnswer) {
		dispatch(updateAnswer(upvotedAnswer))
	}
}

const deUpvoteAndUpdateAnswer = (uid, answerId) => async dispatch => {
	const deUpvotedAnswer = await deUpvoteAnswer(uid, answerId)
	if (deUpvotedAnswer) {
		dispatch(updateAnswer(deUpvotedAnswer))
	}
}

export {
	setAnswers,
	unsetAnswers,
	addAnswer,
	updateAnswer,
	removeAnswer,
	// thunks
	fetchAndUpdateAnswers,
	postAndUpdateAnswer,
	updateAnswerAsync,
	deleteAnswerAsync,
	upvoteAndUpdateAnswer,
	deUpvoteAndUpdateAnswer,
}
