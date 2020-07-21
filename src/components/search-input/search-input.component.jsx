import React from 'react'
import './search-input.styles.scss'

import { withRouter } from 'react-router-dom'

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
		const { history } = this.props
		const { searchText } = this.state
		this.setState({
			searchText: '',
		})
		if (searchText === '') {
			return history.push(`/`)
		}
		history.push(`/search/${encodeURIComponent(searchText)}`)
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
							placeholder='search your question here'
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

export default withRouter(SearchInput)
