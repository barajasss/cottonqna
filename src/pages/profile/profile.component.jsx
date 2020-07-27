import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

import firebase from '../../firebase/firebase'
import { fetchUserById } from '../../firebase/methods/firebase.auth.methods'

import './profile.styles.scss'

class ProfilePage extends React.Component {
	state = {
		displayName: '',
		email: '',
		photoURL: '',
		isLoggedIn: false,
		userNotFound: false,
		fetchedProfile: false,
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
		this.setState({
			fetchedProfile: true,
		})
	}
	render() {
		const {
			displayName,
			email,
			photoURL,
			isLoggedIn,
			userNotFound,
			fetchedProfile,
		} = this.state
		return (
			<div className='profile'>
				<Helmet>
					<title>User Profile</title>
				</Helmet>
				{!fetchedProfile && <h5>Loading Profile...</h5>}
				{displayName && photoURL && email ? (
					<div>
						<img
							className='profile-image'
							src={photoURL}
							alt={`${displayName}`}
						/>
						<h3>{displayName}</h3>
						<h6>Email: {email}</h6>
					</div>
				) : (
					''
				)}

				{isLoggedIn ? (
					<div className='card p-2 mt-5 bg-success text-white'>
						<p className='m-0'>
							<i className='fas fa-info-circle' />
							Account Details can only be changed in your google
							account.
						</p>
					</div>
				) : (
					''
				)}

				{userNotFound ? <h3>User Not Found</h3> : ''}
			</div>
		)
	}
}

export default withRouter(ProfilePage)
