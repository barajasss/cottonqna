import React from 'react'
import './edit-answer.styles.scss'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
	updateAnswerAsync,
	deleteAnswerAsync,
} from '../../redux/answer/answer.actions'

class EditAnswer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			displayEditForm: false,
			answer: props.answer,
		}
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	toggleEditForm = () => {
		this.setState(state => ({
			displayEditForm: !state.displayEditForm,
		}))
	}
	deleteAnswer = async answerId => {
		const { deleteAnswerAsync } = this.props
		await deleteAnswerAsync(answerId)
	}
	handleSubmit = async e => {
		e.preventDefault()
		const { id, updateAnswerAsync } = this.props
		let { answer } = this.state
		await updateAnswerAsync({
			id,
			answer,
		})
		this.setState(state => ({
			displayEditForm: false,
		}))
	}
	render() {
		const { id, questionId } = this.props
		const { answer, displayEditForm } = this.state
		return (
			<div>
				<button
					className='btn btn-link pl-0 mt-n3 mb-2'
					onClick={this.toggleEditForm}>
					<small>
						<i className='fas fa-pen' />
						Edit
					</small>
				</button>
				<button
					className='btn btn-link pl-0 mt-n3 mb-2 ml-2 text-danger'
					data-target={`#modal-${id}`}
					data-toggle='modal'>
					<small>
						<i className='fas fa-trash' />
						Delete
					</small>
				</button>
				<Link
					to={`/questions/${questionId}`}
					className='btn btn-link pl-0 mt-n3 mb-2 ml-2'>
					<small>
						Question <i className='fas fa-arrow-right' />
					</small>
				</Link>

				<div className='modal fade' id={`modal-${id}`}>
					<div
						className='modal-dialog modal-dialog-centered'
						role='document'>
						<div className='modal-content  p-2 m-2'>
							<div className='modal-body'>
								<h5>Confirm delete?</h5>
								<div className='row mt-3'>
									<div className='col'>
										<button
											className='btn btn-block btn-danger'
											data-dismiss='modal'
											type='button'
											onClick={() => {
												this.deleteAnswer(id)
											}}>
											Yes
										</button>
									</div>
									<div className='col'>
										<button
											className='btn btn-block btn-warning'
											data-dismiss='modal'
											type='button'>
											No
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{displayEditForm ? (
					<form
						className='post-answer-form'
						onSubmit={this.handleSubmit}>
						<textarea
							className='form-control'
							rows='5'
							placeholder='Edit your answer related to academics or cotton university.'
							minLength={10}
							maxLength={2000}
							name='answer'
							onChange={this.handleChange}
							defaultValue={answer}
							required
						/>
						<p className='mb-2'>
							<small>{answer.length} / 2000</small>
						</p>
						<button className='btn btn-block btn-primary mt-1 mb-4'>
							Update Answer
						</button>
					</form>
				) : (
					''
				)}
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	updateAnswerAsync: answer => dispatch(updateAnswerAsync(answer)),
	deleteAnswerAsync: answerId => dispatch(deleteAnswerAsync(answerId)),
})

export default connect(null, mapDispatchToProps)(EditAnswer)
