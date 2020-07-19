import React from 'react'

import './question.styles.scss'

import { fetchAndUpdateQuestion } from '../../redux/question/question.actions'
import Question from '../../components/question/question.component'
import { connect } from 'react-redux'

class QuestionPage extends React.Component {
	constructor() {
		super()
		this.state = {
			questionExists: true,
		}
	}
	componentDidMount = async () => {
		const {
			fetchAndUpdateQuestion,
			match: { params },
		} = this.props
		const question = await fetchAndUpdateQuestion(params.questionId)
		if (!question) {
			this.setState({
				questionExists: false,
			})
		} else {
			this.setState({
				questionExists: true,
			})
		}
	}
	render() {
		const { question } = this.props
		const { questionExists } = this.state
		return (
			<div>
				{questionExists ? (
					question ? (
						<Question {...question} expanded />
					) : (
						''
					)
				) : (
					<h3>Question Does Not Exist</h3>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ questions }, { match: { params } }) => {
	return {
		question: questions.find(question => question.id === params.questionId),
	}
}
const mapDispatchToProps = () => (dispatch, { match: { params } }) => ({
	fetchAndUpdateQuestion: () =>
		dispatch(fetchAndUpdateQuestion(params.questionId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage)
