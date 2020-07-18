import React from 'react'
import './login.styles.scss'

class Login extends React.Component {
	render() {
		return (
			<div className='login card bg-info'>
				<p>
					<i className='fas fa-info-circle'></i> To view profile,
					options and answer questions, click continue with google. If
					you are a cottonian, please help others and volunteer.
				</p>
				<button className='btn btn-block btn-light'>
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
