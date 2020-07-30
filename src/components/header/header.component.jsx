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
					location.pathname === '/about' ||
					location.pathname === '/guidelines') && (
					<div
						className='card p-4 mb-3 text-center brand-display text-white'
						style={{
							backgroundImage: 'url("/cotton mcb.png")',
							backgronudSize: 'cover',
							backgroundPosition: 'center center',
							textShadow: '2px 2px 5px #000',
							// boxShadow: '1px 1px 5px 1px #fff inset',
							border: 'none',
						}}>
						<img
							src='/logo.png'
							className='img-responsive'
							style={{
								maxWidth: '30px',
								height: 'auto',
								position: 'absolute',
								left: '10px',
								top: '10px',
							}}
							alt='cottonqna logo'
						/>
						<div
							style={{
								backgroundColor: 'rgba(0, 0, 0, 0.7)',
								width: '80%',
								margin: '0 auto',
								borderRadius: '5px',
								padding: '0.5rem',
							}}>
							<h3 style={{ display: 'inline-block', margin: 0 }}>
								কটন Q & A
							</h3>
							<br />
							<small className='h6'>
								an online community for cottonians
							</small>
						</div>
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
