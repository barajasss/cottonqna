import AnswerActionTypes from './answer.types'

const initialAnswerState = []

const answerReducer = (state = initialAnswerState, action) => {
	switch (action.type) {
		case AnswerActionTypes.SET_ANSWERS:
			return [...action.payload]
		case AnswerActionTypes.UNSET_ANSWERS:
			return initialAnswerState
		case AnswerActionTypes.ADD_ANSWER:
			return [action.payload, ...state]
		case AnswerActionTypes.UPDATE_ANSWER:
			const answerIndex = state.findIndex(
				answer => answer.id === action.payload.id
			)
			if (answerIndex !== -1) {
				const copiedAnswers = [...state]
				copiedAnswers[answerIndex] = action.payload
				return copiedAnswers
			}
			return state
		default:
			return state
	}
}

export default answerReducer
