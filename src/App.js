import React, { lazy, Suspense } from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom'

import Header from './components/header/header.component'

import { connect } from 'react-redux'
import firebase from './firebase/firebase'
import { updateUser } from './redux/user/user.actions'
import { setLoading, unsetLoading } from './redux/loader/loader.actions'

const HomePage = lazy(() => import('./pages/home/home.component'))
const ProfilePage = lazy(() => import('./pages/profile/profile.component'))
const MenuPage = lazy(() => import('./pages/menu/menu.component'))
const PostQuestionPage = lazy(() =>
	import('./pages/post-question/post-question.component')
)
const QuestionPage = lazy(() => import('./pages/question/question.component'))
const MyQuestionPage = lazy(() =>
	import('./pages/myquestion/myquestion.component')
)
const MyAnswerPage = lazy(() => import('./pages/myanswer/myanswer.component'))
const SearchPage = lazy(() => import('./pages/search/search.component'))
const AboutPage = lazy(() => import('./pages/about/about.component'))
const GuidelinePage = lazy(() =>
	import('./pages/guideline/guideline.component')
)
const Page404 = lazy(() => import('./pages/404/404.component'))

class App extends React.Component {
	componentDidMount() {
		const { setLoading, unsetLoading, updateUser } = this.props
		if (window.location.href === 'http://cottonqna.web.app')
			console.log((window.location.href = 'https://cottonqna.co'))
		setLoading()
		this.unsubscribe = firebase.auth().onAuthStateChanged(async user => {
			await updateUser(user)
			unsetLoading()
		})
	}
	componentWillUnmount() {
		this.unsubscribe()
	}
	render() {
		return (
			<div className='App'>
				<Header />
				<Suspense fallback={<h3>Loading...</h3>}>
					<Switch>
						<Route exact path='/' component={HomePage} />
						<Route exact path='/menu' component={MenuPage} />
						<Route exact path='/profile' component={ProfilePage} />
						<Route
							exact
							path='/profile/:uid'
							component={ProfilePage}
						/>
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
						<Route
							exact
							path='/search/:searchText'
							component={SearchPage}
						/>
						<Route exact path='/search' component={SearchPage} />
						<Route exact path='/about' component={AboutPage} />
						<Route
							exact
							path='/guidelines'
							component={GuidelinePage}
						/>
						<Route exact component={Page404} />
					</Switch>
				</Suspense>
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
