import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './answer-form.styles.scss'
import { postAndUpdateAnswer } from '../../redux/answer/answer.actions'

class AnswerForm extends React.Component {
	constructor() {
		super()
		this.state = {
			answer: '',
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	handleSubmit = async e => {
		e.preventDefault()
		const {
			postAndUpdateAnswer,
			user,
			match: { params },
		} = this.props
		const { answer } = this.state
		const { uid, displayName, photoURL } = user
		await postAndUpdateAnswer({
			uid,
			displayName,
			photoURL,
			answer,
			questionId: params.questionId,
		})
	}

	render() {
		const { answer } = this.state
		return (
			<div>
				<form className='answer-form' onSubmit={this.handleSubmit}>
					<textarea
						type='text'
						placeholder='Write your answer here...'
						rows={9}
						name='answer'
						className='form-control mt-3'
						maxLength={2000}
						defaultValue={answer}
						onChange={this.handleChange}
						autoFocus
						required
					/>
					<span>
						<small>{answer.length} / 2000</small>
					</span>
					<button
						className='btn btn-block btn-primary my-3'
						type='submit'>
						Post Answer
					</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => ({
	user,
})

const mapDispatchToProps = dispatch => ({
	postAndUpdateAnswer: answer => dispatch(postAndUpdateAnswer(answer)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AnswerForm))
