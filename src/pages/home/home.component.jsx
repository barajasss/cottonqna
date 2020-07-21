import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import SearchInput from '../../components/search-input/search-input.component'
import QuestionContainer from '../../components/question-container/question-container.component'

import { connect } from 'react-redux'

const loggedInView = isLoading => (
	<div>
		<Link to='/post-question' className='btn btn-block btn-primary'>
			<i className='fas fa-plus-circle' />
			Post a Question
		</Link>

		<SearchInput />
		<div>
			<QuestionContainer />
		</div>
	</div>
)
class HomePage extends React.Component {
	render() {
		const { isLoggedIn, isLoading } = this.props
		return (
			<div>
				<Helmet>
					<title>Home - Cotton Q & A</title>
				</Helmet>
				{isLoggedIn && loggedInView(isLoading)}
			</div>
		)
	}
}

const mapStateToProps = ({ user, isLoading }) => ({
	isLoggedIn: user.isLoggedIn,
	isLoading,
})

export default connect(mapStateToProps)(HomePage)
