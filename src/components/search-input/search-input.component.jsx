import React from 'react'
import './search-input.styles.scss'

class SearchInput extends React.Component {
	render() {
		return (
			<div>
				<form class='form-input'>
					<div class='input-group search-input-container'>
						<input
							class='form-control'
							type='search'
							placeholder='search your question'></input>
						<div class='input-group-append'>
							<button class='btn btn-primary'>
								<i class='fas fa-search'></i>
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default SearchInput
