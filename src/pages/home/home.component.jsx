import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import SearchInput from '../../components/search-input/search-input.component'
import QuestionContainer from '../../components/question-container/question-container.component'

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
					<Link
						to='/post-question'
						className='btn btn-block btn-primary'>
						Post a Question
					</Link>
				) : (
					''
				)}
				<SearchInput />
				<QuestionContainer />
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => ({
	isLoggedIn: user.isLoggedIn,
})

export default connect(mapStateToProps)(HomePage)
