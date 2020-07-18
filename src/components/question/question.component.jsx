import React from 'react'

import './question.styles.scss'
import { Link } from 'react-router-dom'

class Question extends React.Component {
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
		} = this.props
		return (
			<div className='question py-2 border-bottom'>
				<p>
					<img
						src={photoURL}
						alt={displayName}
						className='user-icon'
					/>
					<Link to={`/profile/${uid}`}>
						<small>{displayName}</small>
					</Link>
				</p>
				<p className='m-0'>{question}</p>
				<button className='btn btn-link pl-0'>
					<small>
						<i className='fas fa-arrow-up' />
						{upvotes}
					</small>
				</button>
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

export default Question
