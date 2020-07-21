import React from 'react'
import './edit-question.styles.scss'

import { connect } from 'react-redux'
import {
	updateQuestionAsync,
	deleteQuestionAsync,
} from '../../redux/question/question.actions'

import { createTags } from '../../utils'

class EditQuestion extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			displayEditForm: false,
			question: props.question,
			category: props.category,
			discipline: props.discipline,
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
	deleteQuestion = async questionId => {
		const { deleteQuestionAsync } = this.props
		await deleteQuestionAsync(questionId)
	}
	handleSubmit = async e => {
		e.preventDefault()
		const { id, updateQuestionAsync } = this.props
		let { question, category, discipline } = this.state
		if (question[question.length - 1] !== '?') {
			question = `${question}?`
		}
		const tags = createTags(question)
		await updateQuestionAsync({
			id,
			question,
			category,
			discipline,
			tags,
		})
		this.setState(state => ({
			displayEditForm: false,
		}))
	}
	render() {
		const { id } = this.props
		const { question, category, discipline, displayEditForm } = this.state
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
												this.deleteQuestion(id)
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
						className='post-question-form'
						onSubmit={this.handleSubmit}>
						<textarea
							className='form-control'
							rows='5'
							placeholder='Edit your question related to academics or cotton university.'
							maxLength={500}
							name='question'
							onChange={this.handleChange}
							defaultValue={question}
							required
						/>
						<p className='mb-2'>
							<small>{question.length} / 500</small>
						</p>
						<div className='row'>
							<div className='col'>
								<div className='form-group'>
									<label htmlFor='category'>Category:</label>
									<select
										id='category'
										className='form-control'
										defaultValue={category}
										name='category'
										onChange={this.handleChange}>
										<option value='academic'>
											Academic
										</option>

										<option value='cultural'>
											Cultural
										</option>
										<option value='sports'>Sports</option>
										<option value='official'>
											Official
										</option>
										<option value='all'>All</option>
										<option value='other'>Other</option>
									</select>
								</div>
							</div>
							<div className='col'>
								<div className='form-group'>
									<label htmlFor='discipline'>
										Discipline:
									</label>
									<select
										id='discipline'
										defaultValue={discipline}
										className='form-control'
										name='discipline'
										onChange={this.handleChange}>
										<option value='science'>Science</option>

										<option value='arts'>Arts</option>
										<option value='all'>All</option>
										<option value='other'>Other</option>
									</select>
								</div>
							</div>
						</div>
						<button className='btn btn-block btn-primary mt-1 mb-4'>
							Update Question
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
	updateQuestionAsync: question => dispatch(updateQuestionAsync(question)),
	deleteQuestionAsync: questionId =>
		dispatch(deleteQuestionAsync(questionId)),
})

export default connect(null, mapDispatchToProps)(EditQuestion)
