import React from 'react'
import './myanswer.styles.scss'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Answer from '../../components/answer/answer.component'
import EditAnswer from '../../components/edit-answer/edit-answer.component'

import { fetchByUidAndUpdateAnswers } from '../../redux/answer/answer.actions'

class MyAnswerPage extends React.Component {
	constructor() {
		super()
		this.state = {
			answersFetched: false,
		}
	}
	async componentDidMount() {
		const {
			fetchByUidAndUpdateAnswers,
			user: { uid },
		} = this.props
		await fetchByUidAndUpdateAnswers(uid)
		this.setState({
			answersFetched: true,
		})
	}
	render() {
		const {
			answers,
			user: { isLoggedIn },
		} = this.props
		const { answersFetched } = this.state
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

				{!answersFetched && <h5>Loading your answers...</h5>}
				{answersFetched && answers.length === 0 && (
					<h5>No answers found</h5>
				)}
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
