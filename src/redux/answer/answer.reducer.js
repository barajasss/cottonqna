import AnswerActionTypes from './answer.types'

const initialAnswerState = {
	answers: [],
	allLoaded: false,
}

const answerReducer = (state = initialAnswerState, action) => {
	switch (action.type) {
		case AnswerActionTypes.SET_ANSWERS:
			return {
				...state,
				answers: [...action.payload],
			}
		case AnswerActionTypes.UNSET_ANSWERS:
			return initialAnswerState
		case AnswerActionTypes.ADD_ANSWER:
			return {
				...state,
				answers: [action.payload, ...state.answers],
			}
		case AnswerActionTypes.APPEND_ANSWERS:
			return {
				...state,
				answers: [...state.answers, ...action.payload],
			}

		case AnswerActionTypes.ALL_LOADED:
			return {
				...state,
				allLoaded: action.payload,
			}
		case AnswerActionTypes.UPDATE_ANSWER:
			const answerIndex = state.answers.findIndex(
				answer => answer.id === action.payload.id
			)
			if (answerIndex !== -1) {
				const copiedAnswers = [...state.answers]
				copiedAnswers[answerIndex] = {
					...copiedAnswers[answerIndex],
					...action.payload,
				}
				return {
					...state,
					answers: copiedAnswers,
				}
			}
			return state
		case AnswerActionTypes.REMOVE_ANSWER:
			const copiedAnswers = [...state.answers].filter(
				answer => answer.id !== action.payload
			)
			return {
				...state,
				answers: copiedAnswers,
			}
		default:
			return state
	}
}

export default answerReducer
