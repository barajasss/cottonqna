import QuestionActionTypes from './question.types'

const initialQuestionState = {
	questions: [],
	allLoaded: false,
}

const questionReducer = (state = initialQuestionState, action) => {
	switch (action.type) {
		case QuestionActionTypes.SET_QUESTIONS:
			return {
				...state,
				questions: [...action.payload],
			}
		case QuestionActionTypes.SET_ALL_LOADED:
			return {
				...state,
				allLoaded: action.payload,
			}
		case QuestionActionTypes.UNSET_QUESTIONS:
			return initialQuestionState
		case QuestionActionTypes.APPEND_QUESTIONS:
			return {
				...state,
				questions: [...state.questions, ...action.payload],
			}
		case QuestionActionTypes.UPDATE_QUESTION:
			const questionIndex = state.questions.findIndex(
				question => question.id === action.payload.id
			)
			if (questionIndex !== -1) {
				const copiedState = { ...state }
				const updatedQuestion = {
					...copiedState.questions[questionIndex],
					...action.payload,
				}
				copiedState.questions[questionIndex] = updatedQuestion
				return {
					...state,
					questions: [...copiedState.questions],
				}
			}
			return state
		case QuestionActionTypes.REMOVE_QUESTION:
			const filteredQuestions = state.questions.filter(
				question => question.id !== action.payload
			)
			return {
				...state,
				questions: filteredQuestions,
			}
		default:
			return state
	}
}

export default questionReducer
