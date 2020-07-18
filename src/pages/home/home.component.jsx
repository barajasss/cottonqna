import React from 'react'

import SearchInput from '../../components/search-input/search-input.component'

class HomePage extends React.Component {
	render() {
		return (
			<div>
				<button className='btn btn-block btn-primary'>
					Post a Question
				</button>
				<SearchInput />
			</div>
		)
	}
}

export default HomePage
