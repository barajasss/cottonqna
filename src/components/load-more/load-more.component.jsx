import React from 'react'
import { connect } from 'react-redux'

const LoadMore = ({ allLoaded, isLoading, fetchNext }) =>
	!allLoaded && (
		<button className='btn btn-primary' onClick={fetchNext}>
			{isLoading ? 'Loading...' : 'Load More'}
		</button>
	)

const mapStateToProps = ({ isLoading }) => ({
	isLoading,
})

export default connect(mapStateToProps)(LoadMore)
