import React from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/home/home.component'
import ProfilePage from './pages/profile/profile.component'
import MenuPage from './pages/menu/menu.component'
import Page404 from './pages/404/404.component'

import Header from './components/header/header.component'

import { connect } from 'react-redux'
import { firebase } from './firebase.utils'
import { updateUser } from './redux/user/user.actions'

class App extends React.Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.props.updateUser(user)
		})
	}
	render() {
		return (
			<div className='App'>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/menu' component={MenuPage} />
					<Route path='/profile' component={ProfilePage} />
					<Route component={Page404} />
				</Switch>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	updateUser: user => dispatch(updateUser(user)),
})

export default connect(null, mapDispatchToProps)(App)
