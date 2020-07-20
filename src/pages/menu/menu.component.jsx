import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './menu.styles.scss'
import { googleSignOut } from '../../firebase.utils'

import './menu.styles.scss'

class MenuPage extends React.Component {
	render() {
		const {
			isLoggedIn,
			match: { url },
		} = this.props
		return (
			<div className='menu'>
				<Helmet>
					<title>Options Menu</title>
				</Helmet>
				<div className='list-group'>
					<Link
						to='/'
						className='list-group-item list-group-item-action list-group-item-light'>
						<i className='fas fa-info-circle'></i> About Cotton Q &
						A
					</Link>
					<Link
						to='/'
						className='list-group-item list-group-item-action list-group-item-light'>
						<i className='fas fa-info-circle'></i> Terms and
						Conditions
					</Link>
				</div>
				<br />
				{isLoggedIn ? (
					<div className='list-group'>
						<Link
							to={`${url}/myquestions`}
							className='list-group-item list-group-item-action list-group-item-light'>
							<i className='fas fa-book'></i> My Questions
						</Link>
						<Link
							to='/'
							className='list-group-item list-group-item-action list-group-item-light'>
							<i className='fas fa-book'></i> My Answers
						</Link>
						<button
							onClick={googleSignOut}
							className='list-group-item list-group-item-action list-group-item-light'>
							<i className='fas fa-sign-out-alt'></i> Log Out
						</button>
					</div>
				) : (
					''
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => ({
	isLoggedIn: user.isLoggedIn,
})

export default connect(mapStateToProps)(MenuPage)
