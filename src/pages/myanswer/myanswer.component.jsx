import React from 'react'
import './myanswer.styles.scss'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Answer from '../../components/answer/answer.component'
import EditAnswer from '../../components/edit-answer/edit-answer.component'

import { fetchByUidAndUpdateAnswers } from '../../redux/answer/answer.actions'

class MyAnswerPage extends React.Component {
	componentDidMount = async () => {
		const {
			fetchByUidAndUpdateAnswers,
			user: { uid },
		} = this.props
		await fetchByUidAndUpdateAnswers(uid)
	}
	render() {
		const {
			answers,
			user: { isLoggedIn },
		} = this.props
		return (
			<div>
				<Helmet>
					<title>My Answers</title>
				</Helmet>
				<h3 className='pb-3 border-bottom'>My Answers</h3>
				{!isLoggedIn ? <Redirect to='/' /> : ''}
				{answers.map(answer => (
					<div key={answer.id}>
						<Answer {...answer} />
						<EditAnswer {...answer} />
					</div>
				))}
			</div>
		)
	}
}

const mapStateToProps = ({ answers, user }) => ({
	answers,
	user,
})

const mapDispatchToProps = dispatch => ({
	fetchByUidAndUpdateAnswers: uid =>
		dispatch(fetchByUidAndUpdateAnswers(uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAnswerPage)
