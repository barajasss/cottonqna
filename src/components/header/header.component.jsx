import React from 'react'

import './header.styles.scss'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from '../loader/loader.component'
import Login from '../login/login.component'

class Header extends React.Component {
	render() {
		const { isLoggedIn } = this.props
		return (
			<header>
				{!isLoggedIn ? <Login /> : ''}
				<Loader />
				<nav>
					<ul className='row no-gutters'>
						<li className='col-5'>
							<Link to='/'>
								<i className='fas fa-home'></i> Home
							</Link>
						</li>
						<li className='col-5'>
							<Link to='/profile'>
								<i className='fas fa-user'></i> Profile
							</Link>
						</li>
						<li className='col-2'>
							<Link to='/menu'>
								<i className='fas fa-bars'></i>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		)
	}
}

const mapStateToProps = ({ user }) => ({
	isLoggedIn: user.isLoggedIn,
})

export default connect(mapStateToProps)(Header)
