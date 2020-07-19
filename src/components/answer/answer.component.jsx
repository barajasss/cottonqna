import React from 'react'
import './answer.styles.scss'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
	upvoteAndUpdateAnswer,
	deUpvoteAndUpdateAnswer,
} from '../../redux/answer/answer.actions'

class Answer extends React.Component {
	constructor() {
		super()
		this.state = {
			upvoted: false,
		}
	}

	upvoteAnswer = async (uid, id) => {
		const { upvoteAndUpdateAnswer } = this.props
		await upvoteAndUpdateAnswer(uid, id)
		this.setState({
			upvoted: true,
		})
	}

	deUpvoteAnswer = async (uid, id) => {
		const { deUpvoteAndUpdateAnswer } = this.props
		await deUpvoteAndUpdateAnswer(uid, id)
		this.setState({
			upvoted: false,
		})
	}

	componentDidMount = () => {
		const { upvotes, user } = this.props
		const upvoteIds = upvotes.map(upvoteDoc => upvoteDoc.data().uid)
		if (upvoteIds.includes(user.uid)) {
			this.setState({
				upvoted: true,
			})
		}
	}
	render() {
		const {
			uid,
			id,
			displayName,
			photoURL,
			answer,
			upvotes,
			isLoggedIn,
			user,
		} = this.props
		const { upvoted } = this.state
		return (
			<div className='my-2 py-2 border-bottom answer'>
				<p className='pb-1 m-0'>
					<img
						src={photoURL}
						alt={displayName}
						className='user-icon'
					/>
					<Link to={`/profile/${uid}`}>
						<small>{displayName}</small>
					</Link>
				</p>
				<p className='m-0'>{answer}</p>

				{isLoggedIn ? (
					upvoted ? (
						<button
							className='btn btn-link pl-0'
							onClick={() => this.deUpvoteAnswer(user.uid, id)}>
							<small className='upvoted'>
								<i className='fas fa-arrow-up' />
								{upvotes.length}{' '}
								{upvotes.length === 1 ? 'upvote' : 'upvotes'}
							</small>
						</button>
					) : (
						<button
							className='btn btn-link pl-0'
							onClick={() => this.upvoteAnswer(user.uid, id)}>
							<small className='not-upvoted'>
								<i className='fas fa-arrow-up' />
								{upvotes.length}{' '}
								{upvotes.length === 1 ? 'upvote' : 'upvotes'}
							</small>
						</button>
					)
				) : (
					<button className='btn btn-link pl-0' disabled>
						<small>
							{upvotes.length}{' '}
							{upvotes.length === 1 ? 'upvote' : 'upvotes'}
						</small>
					</button>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => ({
	user,
	isLoggedIn: user.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
	upvoteAndUpdateAnswer: (uid, answerId) =>
		dispatch(upvoteAndUpdateAnswer(uid, answerId)),
	deUpvoteAndUpdateAnswer: (uid, answerId) =>
		dispatch(deUpvoteAndUpdateAnswer(uid, answerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Answer)
