import React from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/home/home.component'
import ProfilePage from './pages/profile/profile.component'
import MenuPage from './pages/menu/menu.component'
import PostQuestionPage from './pages/post-question/post-question.component'
import QuestionPage from './pages/question/question.component'
import MyQuestionPage from './pages/myquestion/myquestion.component'
import MyAnswerPage from './pages/myanswer/myanswer.component'

import Page404 from './pages/404/404.component'

import Header from './components/header/header.component'

import { connect } from 'react-redux'
import { firebase } from './firebase.utils'
import { updateUser } from './redux/user/user.actions'
import { setLoading, unsetLoading } from './redux/loader/loader.actions'

class App extends React.Component {
	componentDidMount() {
		const { setLoading, unsetLoading, updateUser } = this.props
		setLoading()
		firebase.auth().onAuthStateChanged(async user => {
			await updateUser(user)
			console.log(user)
			unsetLoading()
		})
	}
	render() {
		return (
			<div className='App'>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/menu' component={MenuPage} />
					<Route exact path='/profile' component={ProfilePage} />
					<Route exact path='/profile/:uid' component={ProfilePage} />
					<Route
						exact
						path='/post-question'
						component={PostQuestionPage}
					/>
					<Route
						exact
						path='/questions/:questionId'
						component={QuestionPage}
					/>
					<Route
						exact
						path='/menu/myquestions'
						component={MyQuestionPage}
					/>
					<Route
						exact
						path='/menu/myanswers'
						component={MyAnswerPage}
					/>
					<Route exact component={Page404} />
				</Switch>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	updateUser: user => dispatch(updateUser(user)),
	setLoading: () => dispatch(setLoading()),
	unsetLoading: () => dispatch(unsetLoading()),
})

export default connect(null, mapDispatchToProps)(App)
