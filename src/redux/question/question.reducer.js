import QuestionActionTypes from './question.types'

const initialQuestionState = []

const questionReducer = (state = initialQuestionState, action) => {
    switch(action.type){
        case QuestionActionTypes.SET_QUESTIONS: 
            return [
                ...action.payload
            ]
        case QuestionActionTypes.APPEND_QUESTIONS: 
            return [
                ...state,
                ...action.payload
            ]
        default: 
            return state
    }
}

export default questionReducer