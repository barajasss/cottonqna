import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { postQuestion } from '../../firebase.utils'

import './post-question.styles.scss'

class PostQuestionPage extends React.Component {
	constructor() {
		super()
		this.state = {
			question: '',
			category: 'other',
			discipline: 'other',
		}
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
		await postQuestion({
			uid,
			displayName,
			photoURL,
			question,
			category,
			discipline,
		})
		// error handler goes here
		history.push('/')
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	render() {
		const { isLoggedIn } = this.props
		const { question, category, discipline } = this.state
		return (
			<div>
				<Helmet>
					<title>Post Question - Cotton Q & A</title>
				</Helmet>
				{!isLoggedIn ? <Redirect to='/' /> : ''}
				<ul className='question-page-info list-group my-3'>
					<li className='list-group-item list-group-item-primary'>
						<i className='fas fa-square'></i> Ask any question or
						doubts related to academics in Cotton University.
					</li>
					<li className='list-group-item list-group-item-primary'>
						<i className='fas fa-square'></i> Ask anything about
						social or cultural life in Cotton University.
					</li>
					<li className='list-group-item list-group-item-primary'>
						<i className='fas fa-square'></i> Post a question that
						you are looking for help in admissions, and other
						details.
					</li>
				</ul>
				<form
					className='post-question-form'
					onSubmit={this.handleSubmit}>
					<textarea
						className='form-control mb-3'
						rows='5'
						placeholder='Ask any question related to academics or cotton university.'
						maxLength={500}
						name='question'
						onChange={this.handleChange}
						defaultValue={question}
						required
					/>
					<p>{question.length} / 500</p>
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
									<option value='academic'>Academic</option>

									<option value='cultural'>Cultural</option>
									<option value='sports'>Sports</option>
									<option value='official'>Official</option>
									<option value='other'>Other</option>
								</select>
							</div>
						</div>
						<div className='col'>
							<div className='form-group'>
								<label htmlFor='discipline'>Discipline:</label>
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
					<button className='btn btn-block btn-primary my-4'>
						Post Question
					</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => ({
	user,
	isLoggedIn: user.isLoggedIn,
})

export default connect(mapStateToProps)(withRouter(PostQuestionPage))
