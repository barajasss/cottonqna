import React from 'react'
import './search-input.styles.scss'

class SearchInput extends React.Component {
	render() {
		return (
			<div>
				<form className='form-input'>
					<div className='input-group search-input-container'>
						<input
							className='form-control'
							type='search'
							placeholder='search your question'></input>
						<div className='input-group-append'>
							<button className='btn btn-primary'>
								<i className='fas fa-search'></i>
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default SearchInput
