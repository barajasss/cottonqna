import React from 'react'

import './header.styles.scss'

import { Link } from 'react-router-dom'

import Loader from '../loader/loader.component'
import Login from '../login/login.component'

class Header extends React.Component {
	render() {
		return (
			<header>
				<Login />
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
							<Link to='/options'>
								<i className='fas fa-bars'></i>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		)
	}
}
export default Header
