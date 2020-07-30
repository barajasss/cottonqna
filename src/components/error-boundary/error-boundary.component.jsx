import React from 'react'

class ErrorBoundary extends React.Component {
	constructor() {
		super()
		this.state = {
			hasError: false,
		}
	}
	static getDerivedStateFromError = error => {
		return {
			hasError: true,
		}
	}
	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo)
	}
	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h3>Something went wrong.</h3>
					<p>Make sure internet connection is on.</p>
				</div>
			)
		}
		return this.props.children
	}
}

export default ErrorBoundary
