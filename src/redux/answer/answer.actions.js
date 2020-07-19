import AnswerActionTypes from './answer.types'

import {
	fetchAnswers,
	postAnswer,
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

const upvoteAndUpdateAnswer = (uid, answerId) => async dispatch => {
	const upvotedAnswer = await upvoteAnswer(uid, answerId)
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
	// thunks
	fetchAndUpdateAnswers,
	postAndUpdateAnswer,
	upvoteAndUpdateAnswer,
	deUpvoteAndUpdateAnswer,
}
