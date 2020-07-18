import React from 'react'

import './404.styles.scss'

class Page404 extends React.Component {
	render() {
		return (
			<div className='page404 card p-3 bg-danger'>
				<h5 className='text-center text-white'>
					<i class='fas fa-exclamation-triangle'></i> 404 Page Does
					Not Exist
				</h5>
			</div>
		)
	}
}

export default Page404
