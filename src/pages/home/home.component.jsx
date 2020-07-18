import React from 'react'
import { Helmet } from 'react-helmet'

import SearchInput from '../../components/search-input/search-input.component'

import { connect } from 'react-redux'

class HomePage extends React.Component {
	render() {
		const { isLoggedIn } = this.props
		return (
			<div>
				<Helmet>
					<title>Home - Cotton Q & A</title>
				</Helmet>
				{isLoggedIn ? (
					<button className='btn btn-block btn-primary'>
						Post a Question
					</button>
				) : (
					''
				)}
				<SearchInput />
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => ({
	isLoggedIn: user.isLoggedIn,
})

export default connect(mapStateToProps)(HomePage)
