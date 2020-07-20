import React from 'react'
import './edit-question.styles.scss'

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
	handleSubmit = async e => {
		const {
			user: { uid, displayName, photoURL },
			history,
		} = this.props
		let { question, category, discipline } = this.state
		e.preventDefault()
		if (question[question.length - 1] !== '?') {
			question = `${question}?`
		}
		// await postQuestion({
		// 	uid,
		// 	displayName,
		// 	photoURL,
		// 	question,
		// 	category,
		// 	discipline,
		// })
	}
	render() {
		// const { isLoggedIn } = this.props
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
					data-target='#confirm-delete-modal'
					data-toggle='modal'>
					<small>
						<i className='fas fa-trash' />
						Delete
					</small>
				</button>

				<div className='modal fade' id='confirm-delete-modal'>
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
											data-dismiss='modal'>
											Yes
										</button>
									</div>
									<div className='col'>
										<button
											className='btn btn-block btn-warning'
											data-dismiss='modal'>
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

export default EditQuestion
