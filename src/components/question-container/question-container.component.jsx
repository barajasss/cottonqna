import React from 'react'

import './question-container.styles.scss'
import {
	fetchAndUpdateQuestions,
	fetchNextAndUpdateQuestions,
	searchAndUpdateQuestions,
} from '../../redux/question/question.actions'
import { withRouter } from 'react-router-dom'
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

	fetchNext = () => {
		const { fetchNextAndUpdateQuestions, type } = this.props
		if (type !== 'search') {
			fetchNextAndUpdateQuestions()
		}
	}

	render() {
		const { questions, type, match, allLoaded, isLoading } = this.props
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
				{!allLoaded && type !== 'search' ? (
					<button
						className='btn btn-primary'
						onClick={this.fetchNext}>
						{isLoading ? 'Loading...' : 'Load More'}
					</button>
				) : (
					type !== 'search' && (
						<h5 className='my-3'>No More Questions</h5>
					)
				)}
			</div>
		)
	}
}

const mapStateToProps = ({
	questions: { questions, allLoaded },
	isLoading,
}) => ({
	questions,
	isLoading,
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
