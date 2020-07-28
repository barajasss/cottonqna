import React from 'react'
import './answer-container.styles.scss'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	fetchAndUpdateAnswers,
	fetchNextAndUpdateAnswers,
} from '../../redux/answer/answer.actions'
import LoadMore from '../load-more/load-more.component'

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
		const {
			answers,
			allLoaded,
			fetchNextAndUpdateAnswers,
			match: { params },
		} = this.props
		return (
			<div>
				<div className='m-0 p-1 bg-light text-center border-bottom'>
					{this.renderAnswerHeading()}
				</div>
				{answers.map(answerDoc => (
					<Answer key={answerDoc.id} {...answerDoc} />
				))}
				<LoadMore
					fetchNext={() =>
						fetchNextAndUpdateAnswers(params.questionId)
					}
					allLoaded={allLoaded}
				/>
			</div>
		)
	}
}

const mapStateToProps = ({ answers: { answers, allLoaded } }) => ({
	answers,
	allLoaded,
})

const mapDispatchToProps = dispatch => ({
	fetchAndUpdateAnswers: questionId =>
		dispatch(fetchAndUpdateAnswers(questionId)),
	fetchNextAndUpdateAnswers: questionId =>
		dispatch(fetchNextAndUpdateAnswers(questionId)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AnswerContainer))
