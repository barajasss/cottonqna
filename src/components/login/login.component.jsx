import React from 'react'
import './login.styles.scss'

import { googleSignIn } from '../../firebase.utils'

class Login extends React.Component {
	render() {
		return (
			<div className='login card bg-info'>
				<p>
					<i className='fas fa-info-circle'></i> To view profile,
					options and ask or answer questions, click continue with
					google. If you are a cottonian, please volunteer and help
					others.
				</p>
				<button
					className='btn btn-block btn-light'
					onClick={googleSignIn}>
					<img
						className='google-icon'
						src={`${process.env.PUBLIC_URL}/google icon.png`}
						alt='google icon'
					/>{' '}
					Continue with google
				</button>
			</div>
		)
	}
}

export default Login
