import React from 'react'
import { connect } from 'react-redux'

const LoadMore = ({ allLoaded, isLoading, fetchNext }) =>
	!allLoaded ? (
		<button className='btn btn-primary' onClick={fetchNext}>
			{isLoading ? 'Loading...' : 'Load More'}
		</button>
	) : (
		<h5 className='my-3'>No More Questions</h5>
	)

const mapStateToProps = ({ isLoading, questions: { allLoaded } }) => ({
	isLoading,
	allLoaded,
})

export default connect(mapStateToProps)(LoadMore)
