import React from 'react'
import './menu.styles.scss'
import { Link } from 'react-router-dom'
import { googleSignOut } from '../../firebase.utils'

import './menu.styles.scss'

class MenuPage extends React.Component {
	render() {
		return (
			<div className='menu'>
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
				<div className='list-group'>
					<Link
						to='/'
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
			</div>
		)
	}
}

export default MenuPage
