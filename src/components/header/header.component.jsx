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
		const { isLoggedIn, isLoading, location } = this.props
		return (
			<header>
				{(location.pathname === '/' ||
					location.pathname === '/about') && (
					<div className='card p-4 mb-3 text-center'>
						<h3 className=''>কটন Q & A</h3>
						<small>an online community for cottonians</small>
					</div>
				)}
				{!isLoggedIn ? <Login /> : ''}
				{isLoading ? <Loader /> : ''}
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

const mapStateToProps = ({ user, isLoading }) => ({
	isLoggedIn: user.isLoggedIn,
	isLoading,
})

export default connect(mapStateToProps)(withRouter(Header))
