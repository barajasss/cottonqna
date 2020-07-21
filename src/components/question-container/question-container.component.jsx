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
			questionsFetched: false,
		}
	}
	componentDidMount = async () => {
		const { fetchAndUpdateQuestions } = this.props
		await fetchAndUpdateQuestions()
		this.setState({
			questionsFetched: true,
		})
	}
	render() {
		const { questions } = this.props
		const { questionsFetched } = this.state
		return (
			<div className='mt-4'>
				{questions.map(questionDoc => (
					<Question key={questionDoc.id} {...questionDoc} />
				))}
				{questionsFetched && questions.length === 0 && (
					<h4>Questions not found</h4>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ questions, isLoading }) => ({
	questions,
	isLoading,
})

const mapDispatchToProps = dispatch => ({
	fetchAndUpdateQuestions: () => dispatch(fetchAndUpdateQuestions()),
	fetchNextAndUpdateQuestions: () => dispatch(fetchNextAndUpdateQuestions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)
