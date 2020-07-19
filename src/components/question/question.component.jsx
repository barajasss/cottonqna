import React from 'react'

import './question.styles.scss'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import {
	upvoteAndUpdateQuestion,
	deUpvoteAndUpdateQuestion,
} from '../../redux/question/question.actions'

class Question extends React.Component {
	constructor() {
		super()
		this.state = {
			upvoted: false,
		}
	}

	upvoteQuestion = async (uid, id) => {
		const { upvoteAndUpdateQuestion } = this.props
		await upvoteAndUpdateQuestion(uid, id)
		this.setState({
			upvoted: true,
		})
	}

	deUpvoteQuestion = async (uid, id) => {
		const { deUpvoteAndUpdateQuestion } = this.props
		await deUpvoteAndUpdateQuestion(uid, id)
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
			id,
			uid,
			displayName,
			photoURL,
			question,
			category,
			discipline,
			upvotes,
			createdAt,
			isLoggedIn,
			user,
			expanded,
		} = this.props
		const { upvoted } = this.state
		return (
			<div className='question py-2 border-bottom'>
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
				<div className={expanded ? 'm-0 mt-2' : 'm-0'}>
					{expanded ? (
						<h5 className='font-weight-bold'>{question}</h5>
					) : (
						<Link
							to={`/questions/${id}`}
							className='text-dark font-weight-bold'>
							{question}
						</Link>
					)}
				</div>

				{expanded ? (
					<p className='py-2'>
						<small className='p-0 font-weight-bold'>
							Category: {category}
						</small>
						<br />
						<small className='p-0 font-weight-bold'>
							Discipline: {discipline}
						</small>
					</p>
				) : (
					''
				)}

				{isLoggedIn ? (
					upvoted ? (
						<button
							className='btn btn-link pl-0'
							onClick={() => this.deUpvoteQuestion(user.uid, id)}>
							<small className='upvoted'>
								<i className='fas fa-arrow-up' />
								{upvotes.length}
							</small>
						</button>
					) : (
						<button
							className='btn btn-link pl-0'
							onClick={() => this.upvoteQuestion(user.uid, id)}>
							<small>
								<i className='fas fa-arrow-up' />
								{upvotes.length}
							</small>
						</button>
					)
				) : (
					<button>
						<small>{upvotes.length} upvotes</small>
					</button>
				)}

				<Link to='/' className='btn btn-link pr-0 border-left'>
					<small>
						<i className='fas fa-pen' />
						Answer
					</small>
				</Link>
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => ({
	user,
	isLoggedIn: user.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
	upvoteAndUpdateQuestion: (uid, questionId) =>
		dispatch(upvoteAndUpdateQuestion(uid, questionId)),
	deUpvoteAndUpdateQuestion: (uid, questionId) =>
		dispatch(deUpvoteAndUpdateQuestion(uid, questionId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Question)
