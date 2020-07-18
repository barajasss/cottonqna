import React from 'react'

import './header.styles.scss'

import { Link } from 'react-router-dom'

import Loader from '../loader/loader.component'

class Header extends React.Component {
	render() {
		return (
			<header>
				<Loader />
				<nav>
					<ul className='row no-gutters'>
						<li className='col-5'>
							<Link to='/'>Home</Link>
						</li>
						<li className='col-5'>
							<Link to='/profile'>Profile</Link>
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
