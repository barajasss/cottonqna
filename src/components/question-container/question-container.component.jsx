import React from 'react'

import './question-container.styles.scss'
import {
	fetchAndUpdateQuestions,
	fetchNextAndUpdateQuestions,
} from '../../redux/question/question.actions'

import Question from '../question/question.component'

import { connect } from 'react-redux'

class QuestionContainer extends React.Component {
	componentDidMount() {
		const { fetchQuestionsAndUpdate } = this.props
		fetchQuestionsAndUpdate()
	}
	render() {
		const { questions } = this.props
		return (
			<div className='mt-4'>
				{questions.map(questionDoc => (
					<Question key={questionDoc.id} {...questionDoc} />
				))}
				{questions.length === 0 ? <h4>No questions found</h4> : ''}
			</div>
		)
	}
}

const mapStateToProps = ({ questions }) => ({
	questions,
})

const mapDispatchToProps = dispatch => ({
	fetchQuestionsAndUpdate: () => dispatch(fetchAndUpdateQuestions()),
	fetchNextQuestionsAndUpdate: () => dispatch(fetchNextAndUpdateQuestions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)
