import QuestionActionTypes from './question.types'

const initialQuestionState = []

const questionReducer = (state = initialQuestionState, action) => {
	switch (action.type) {
		case QuestionActionTypes.SET_QUESTIONS:
			return [...action.payload]
		case QuestionActionTypes.APPEND_QUESTIONS:
			return [...state, ...action.payload]
		case QuestionActionTypes.UPDATE_QUESTION:
			console.log(action.payload)
			const questionIndex = state.findIndex(
				question => question.id === action.payload.id
			)
			if (questionIndex !== -1) {
				const copiedState = [...state]
				copiedState[questionIndex] = action.payload
				return [...copiedState]
			}
			return state
		default:
			return state
	}
}

export default questionReducer
