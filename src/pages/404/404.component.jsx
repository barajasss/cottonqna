import React from 'react'
import { Helmet } from 'react-helmet'

import './404.styles.scss'

class Page404 extends React.Component {
	render() {
		return (
			<div className='page404 card p-3 bg-danger'>
				<Helmet>
					<title>404 Not Found</title>
				</Helmet>
				<h5 className='text-center text-white'>
					<i className='fas fa-exclamation-triangle'></i> 404 Page
					Does Not Exist
				</h5>
			</div>
		)
	}
}

export default Page404
