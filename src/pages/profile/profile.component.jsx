import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

import { firebase } from '../../firebase.utils'
import { fetchUserById } from '../../firebase.utils'

import './profile.styles.scss'

class ProfilePage extends React.Component {
	state = {
		displayName: '',
		email: '',
		photoURL: '',
		isLoggedIn: false,
		userNotFound: false,
	}
	async componentDidMount() {
		const { match } = this.props
		if (match.path === '/profile/:uid') {
			const uid = match.params.uid
			try {
				const user = await fetchUserById(uid)
				if (!user) {
					this.setState({
						userNotFound: true,
					})
					return
				}
				const { displayName, email, photoURL } = user
				this.setState({
					displayName,
					email,
					photoURL,
				})
			} catch (err) {
				console.log('error', err)
			}
		} else {
			firebase.auth().onAuthStateChanged(user => {
				console.log('state changed', user)
				if (!user) return
				const { displayName, email, photoURL } = user
				this.setState({
					displayName,
					email,
					photoURL,
					isLoggedIn: true,
				})
			})
		}
	}
	render() {
		const {
			displayName,
			email,
			photoURL,
			isLoggedIn,
			userNotFound,
		} = this.state
		return (
			<div className='profile'>
				<Helmet>
					<title>User Profile</title>
				</Helmet>
				{displayName && photoURL && email ? (
					<div>
						<img
							className='profile-image'
							src={photoURL}
							alt={`${displayName}`}
						/>
						<h3>{displayName}</h3>
						<h5>Email: {email}</h5>
					</div>
				) : (
					''
				)}

				{isLoggedIn ? (
					<p className='card p-3 mt-3 bg-warning'>
						Account Details can only be changed in your google
						account.
					</p>
				) : (
					''
				)}

				{userNotFound ? <h3>User Not Found</h3> : ''}
			</div>
		)
	}
}

export default withRouter(ProfilePage)
