import React from 'react'
import './answer-container.styles.scss'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAndUpdateAnswers } from '../../redux/answer/answer.actions'

import Answer from '../answer/answer.component'

class AnswerContainer extends React.Component {
	componentDidMount = async () => {
		const {
			fetchAndUpdateAnswers,
			match: { params },
		} = this.props
		await fetchAndUpdateAnswers(params.questionId)
	}
	renderAnswerHeading() {
		const { answers } = this.props
		if (answers.length === 0) {
			return 'No Answers'
		} else if (answers.length === 1) {
			return '1 Answer'
		} else {
			return `${answers.length} Answers`
		}
	}
	render() {
		const { answers } = this.props
		return (
			<div>
				<div className='m-0 p-1 bg-light text-center border-bottom'>
					{this.renderAnswerHeading()}
				</div>
				{answers.map(answerDoc => (
					<Answer key={answerDoc.id} {...answerDoc} />
				))}
			</div>
		)
	}
}

const mapStateToProps = ({ answers }) => ({
	answers,
})

const mapDispatchToProps = dispatch => ({
	fetchAndUpdateAnswers: questionId =>
		dispatch(fetchAndUpdateAnswers(questionId)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AnswerContainer))
