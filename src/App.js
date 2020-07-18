import React from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom'
import Home from './pages/home/home.component'
import Header from './components/header/header.component'

function App() {
	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/' component={Home} />
			</Switch>
		</div>
	)
}

export default App
