import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ isLoading }) => ({
	isLoading,
})

const withLoader = WrappedComponent => {
	return connect(mapStateToProps)(({ isLoading }) => (
		<div>
			<h4 className={isLoading ? 'visible' : 'invisible'}>Loading...</h4>
			<div className={isLoading ? 'invisible' : 'visible'}>
				<WrappedComponent />
			</div>
		</div>
	))
}

export default withLoader
