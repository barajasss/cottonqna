import React from 'react'

import './question-container.styles.scss'
import {
	fetchAndUpdateQuestions,
	fetchNextAndUpdateQuestions,
	searchAndUpdateQuestions,
} from '../../redux/question/question.actions'
import { withRouter } from 'react-router-dom'
import Question from '../question/question.component'
import LoadMore from '../load-more/load-more.component'

import { connect } from 'react-redux'

class QuestionContainer extends React.Component {
	constructor() {
		super()
		this.state = {
			questionsFetched: false,
		}
	}

	componentDidMount = async () => {
		const {
			fetchAndUpdateQuestions,
			searchAndUpdateQuestions,
			match,
			match: {
				params: { searchText },
			},
		} = this.props
		if (match.path.startsWith('/search')) {
			await searchAndUpdateQuestions(searchText)
		} else {
			await fetchAndUpdateQuestions()
		}
		this.setState({
			questionsFetched: true,
		})
	}

	render() {
		const {
			questions,
			type,
			match,
			fetchNextAndUpdateQuestions,
			allLoaded,
		} = this.props
		const { questionsFetched } = this.state
		return (
			<div className='mt-4'>
				{questionsFetched && type === 'search' && (
					<h5>
						{questions.length} search{' '}
						{questions.length === 1 ? 'result' : 'results'} for{' '}
						<small>
							"{decodeURIComponent(match.params.searchText)}"
						</small>
					</h5>
				)}
				{!questionsFetched && type === 'search' && (
					<h5>
						Searching for{' '}
						<small>
							"{decodeURIComponent(match.params.searchText)}"
						</small>
					</h5>
				)}
				{questions.map(questionDoc => (
					<Question key={questionDoc.id} {...questionDoc} />
				))}
				{!questionsFetched && type !== 'search' && (
					<h5>Loading Questions...</h5>
				)}

				{questionsFetched &&
					questions.length === 0 &&
					type !== 'search' && <h5>Questions not found</h5>}

				{questionsFetched && type !== 'search' && (
					<LoadMore
						fetchNext={fetchNextAndUpdateQuestions}
						allLoaded={allLoaded}
					/>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ questions: { questions, allLoaded } }) => ({
	questions,
	allLoaded,
})

const mapDispatchToProps = dispatch => ({
	fetchAndUpdateQuestions: () => dispatch(fetchAndUpdateQuestions()),
	fetchNextAndUpdateQuestions: () => dispatch(fetchNextAndUpdateQuestions()),
	searchAndUpdateQuestions: searchTerm =>
		dispatch(searchAndUpdateQuestions(searchTerm)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(QuestionContainer))
