import React from 'react'
import { Helmet } from 'react-helmet'

class ProfilePage extends React.Component {
	render() {
		return (
			<div class='profile'>
				<Helmet>
					<title>Profile Page</title>
				</Helmet>
				Profile page
			</div>
		)
	}
}

export default ProfilePage
