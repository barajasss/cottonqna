import React from 'react'
import './myanswer.styles.scss'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Answer from '../../components/answer/answer.component'
import EditAnswer from '../../components/edit-answer/edit-answer.component'

import {
	fetchByUidAndUpdateAnswers,
	fetchNextByUidAndUpdateAnswers,
} from '../../redux/answer/answer.actions'
import LoadMore from '../../components/load-more/load-more.component'

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
		if (!uid) {
			return
		}
		await fetchByUidAndUpdateAnswers(uid)
		this.setState({
			answersFetched: true,
		})
	}
	render() {
		const {
			answers,
			user: { isLoggedIn, uid },
			allLoaded,
			fetchNextByUidAndUpdateAnswers,
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
				<LoadMore
					fetchNext={() => fetchNextByUidAndUpdateAnswers(uid)}
					allLoaded={allLoaded}
				/>
			</div>
		)
	}
}

const mapStateToProps = ({ answers: { answers, allLoaded }, user }) => ({
	answers,
	allLoaded,
	user,
})

const mapDispatchToProps = dispatch => ({
	fetchByUidAndUpdateAnswers: uid =>
		dispatch(fetchByUidAndUpdateAnswers(uid)),
	fetchNextByUidAndUpdateAnswers: uid =>
		dispatch(fetchNextByUidAndUpdateAnswers(uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAnswerPage)
