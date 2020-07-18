import React from 'react'

import './header.styles.scss'

import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

import Loader from '../loader/loader.component'
import Login from '../login/login.component'

const checkActiveLink = url => (match, location) => {
	if (
		!location.pathname.startsWith('/profile') &&
		!location.pathname.startsWith('/menu') &&
		url === '/'
	)
		return true
	if (url !== '/') {
		if (location.pathname.startsWith(url)) return true
	}
}

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
							<NavLink
								to='/'
								activeClassName='active'
								isActive={checkActiveLink('/')}>
								<i className='fas fa-home'></i> Home
							</NavLink>
						</li>
						<li className='col-5'>
							<NavLink
								to='/profile'
								activeClassName='active'
								isActive={checkActiveLink('/profile')}>
								<i className='fas fa-user'></i> Profile
							</NavLink>
						</li>
						<li className='col-2'>
							<NavLink
								to='/menu'
								activeClassName='active'
								isActive={checkActiveLink('/menu')}>
								<i className='fas fa-bars'></i>
							</NavLink>
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

export default connect(mapStateToProps)(withRouter(Header))
