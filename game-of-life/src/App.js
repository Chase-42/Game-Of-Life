import React from 'react';
// Components
import Header from './components/header';
import Home from './components/home';
import Game from './components/game';
// Tools
import { Route } from 'react-router-dom';
// Styles
import './App.css';

function App() {
	return (
		<div className='App'>
			<Header />
			<Route exact path='/' component={Home} />
			<Route path='/game' component={Game} />
		</div>
	);
}

export default App;
