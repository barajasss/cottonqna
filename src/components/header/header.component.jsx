import React from 'react'

import './header.styles.scss'

import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

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
							<NavLink exact to='/' activeClassName='active'>
								<i className='fas fa-home'></i> Home
							</NavLink>
						</li>
						<li className='col-5'>
							<NavLink to='/profile' activeClassName='active'>
								<i className='fas fa-user'></i> Profile
							</NavLink>
						</li>
						<li className='col-2'>
							<NavLink to='/menu' activeClassName='active'>
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
