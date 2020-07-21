import React from 'react'
import './login.styles.scss'

import { googleSignIn } from '../../firebase.utils'
import { connect } from 'react-redux'

class Login extends React.Component {
	render() {
		const { isLoading } = this.props
		return (
			<div>
				{!isLoading && (
					<div className='login card bg-info p-3'>
						<p className='p-0'>
							<i className='fas fa-info-circle'></i> To view
							profile, options and ask or answer questions, click
							continue with google. If you are a cottonian, please
							volunteer and help others.
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
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ isLoading }) => ({
	isLoading,
})

export default connect(mapStateToProps)(Login)
