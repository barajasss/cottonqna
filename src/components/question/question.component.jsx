import React from 'react'

import './question.styles.scss'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { connect } from 'react-redux'

import Answer from '../answer/answer.component'

import {
	upvoteAndUpdateQuestion,
	deUpvoteAndUpdateQuestion,
} from '../../redux/question/question.actions'

class Question extends React.Component {
	constructor() {
		super()
		this.state = {
			upvoted: false,
			displayShareIcon:
				window.innerWidth <= 800 && window.innerHeight <= 900,
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

	sharePopup = () => {
		const { id: questionId, question } = this.props
		if ('share' in window.navigator) {
			navigator
				.share({
					title: `Can you answer this Cotton Q & A Question?`,
					text: question,
					url: `https://cottonqna.co/questions/${questionId}`,
				})
				.then(() => {
					console.log('shared successfully')
				})
				.catch(err => {
					console.log('share error')
				})
		}
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
			answerCount,
			firstAnswer,
			isLoggedIn,
			user,
			expanded,
			// methods
			toggleAnswerForm,
		} = this.props
		const { upvoted, displayShareIcon } = this.state
		return (
			<div className='question py-2'>
				<Helmet>
					<title>Cotton Q & A - Question</title>
					<meta name='description' content={question} />
				</Helmet>
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
					<p className='m-0 date-display'>
						{new Date(createdAt).toDateString()}
					</p>
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
						<span className='badge badge-info'>
							Category: {category}
						</span>{' '}
						<span className='badge badge-info'>
							Discipline: {discipline}
						</span>
					</p>
				) : (
					''
				)}

				{isLoggedIn ? (
					upvoted ? (
						<button
							className='btn btn-link pl-0 upvote-btn long'
							onClick={() => this.deUpvoteQuestion(user.uid, id)}>
							<small className='upvoted'>
								<i className='fas fa-arrow-up' />
								Upvoted
							</small>
						</button>
					) : (
						<button
							className='btn btn-link pl-0 upvote-btn long'
							onClick={() => this.upvoteQuestion(user.uid, id)}>
							<small className='not-upvoted'>
								<i className='fas fa-arrow-up' />
								Upvote
							</small>
						</button>
					)
				) : (
					''
				)}

				<button className='btn btn-link pl-0' disabled>
					<small>
						{upvotes.length}{' '}
						{upvotes.length === 1 ? 'upvote' : 'upvotes'}
					</small>
				</button>
				{expanded && displayShareIcon && (
					<button
						className='btn btn-link pr-0'
						onClick={() => this.sharePopup()}>
						<small>
							<i className='fas fa-share-alt' />
							Share
						</small>
					</button>
				)}
				{expanded && isLoggedIn ? (
					<button
						className='btn btn-link pr-0'
						onClick={toggleAnswerForm}>
						<small>
							<i className='fas fa-pen' />
							Answer
						</small>
					</button>
				) : (
					<button className='btn btn-link pr-0' disabled>
						<small>
							{answerCount}{' '}
							{answerCount === 1 ? 'answer' : 'answers'}
						</small>
					</button>
				)}
				<div className='pl-3'>
					{firstAnswer ? <Answer {...firstAnswer} embedded /> : ''}
				</div>
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
