import React from 'react'
import './search-input.styles.scss'

import { connect } from 'react-redux'
import { searchAndUpdateQuestions } from '../../redux/question/question.actions'

class SearchInput extends React.Component {
	constructor() {
		super()
		this.state = {
			searchText: '',
		}
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	handleSubmit = async e => {
		e.preventDefault()
		const { searchAndUpdateQuestions } = this.props
		const { searchText } = this.state
		await searchAndUpdateQuestions(searchText)
	}
	render() {
		const { searchText } = this.state
		return (
			<div>
				<form className='form-input' onSubmit={this.handleSubmit}>
					<div className='input-group search-input-container'>
						<input
							className='form-control'
							type='search'
							name='searchText'
							value={searchText}
							onChange={this.handleChange}
							placeholder='search your question'
						/>
						<div className='input-group-append'>
							<button className='btn btn-primary' type='submit'>
								<i className='fas fa-search'></i>
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	searchAndUpdateQuestions: searchTags =>
		dispatch(searchAndUpdateQuestions(searchTags)),
})

export default connect(null, mapDispatchToProps)(SearchInput)
