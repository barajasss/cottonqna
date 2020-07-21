import React from 'react'

import './question-container.styles.scss'
import {
	fetchAndUpdateQuestions,
	fetchNextAndUpdateQuestions,
} from '../../redux/question/question.actions'

import Question from '../question/question.component'

import { connect } from 'react-redux'

class QuestionContainer extends React.Component {
	constructor() {
		super()
		this.state = {
			questionsExist: true,
		}
	}
	componentDidMount = async () => {
		const { fetchAndUpdateQuestions } = this.props
		await fetchAndUpdateQuestions()
		const { questions } = this.props
		if (questions.length === 0) {
			this.setState({
				questionsExist: false,
			})
		} else {
			this.setState({
				questionsExist: true,
			})
		}
	}
	render() {
		const { questions } = this.props
		const { questionsExist } = this.state
		return (
			<div className='mt-4'>
				{questions.map(questionDoc => (
					<Question key={questionDoc.id} {...questionDoc} />
				))}
				{!questionsExist && <h4>No questions found</h4>}
			</div>
		)
	}
}

const mapStateToProps = ({ questions }) => ({
	questions,
})

const mapDispatchToProps = dispatch => ({
	fetchAndUpdateQuestions: () => dispatch(fetchAndUpdateQuestions()),
	fetchNextAndUpdateQuestions: () => dispatch(fetchNextAndUpdateQuestions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)
