import React from 'react';
// Components
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Game from './components/game';
// Tools
import { Route } from 'react-router-dom';
// Styles
import './App.css';
import styled from 'styled-components';

function App() {
	return (
		<AppDiv>
			<Header />
			<Route exact path='/' component={Home} />
			<Route path='/game' component={Game} />
			<Footer />
		</AppDiv>
	);
}

export default App;

const AppDiv = styled.div`
	font-family: 'Rubik', sans-serif;
	max-width: 100%;
	min-width: 100%;
`;
