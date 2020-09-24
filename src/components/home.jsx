import React from 'react';
// Styles
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	render() {
		return (
			<HomeDiv>
				<div>
					<Link exact to='/game'>
						<PlayButton> Play Game! </PlayButton>
					</Link>
				</div>

				<RulesDiv>
					<h3>Rules of the Game:</h3>
					<p>
						1. Any live cell with fewer than 2 live neighbors dies, as if by
						underpopulation.
					</p>
					<p>
						2. Any live cell with 2 or 3 live neighbors lives on to the next
						generation.
					</p>
					<p>
						3. Any live cell with more than 3 live neighbors dies, as if by
						overpopulation.
					</p>
					<p>
						4. Any dead cell with exactly 3 live neighbors becomes a live cell, as if
						by reproduction.
					</p>
				</RulesDiv>
				<AboutDiv>
					<h3>About:</h3>
					<p>
						The Game of Life is a{' '}
						<a href='https://en.wikipedia.org/wiki/Cellular_automaton'>
							cellular automation
						</a>{' '}
						created by{' '}
						<a href='https://en.wikipedia.org/wiki/John_Horton_Conway'>
							John Horton Conway
						</a>{' '}
						in 1970. It is a zero-player game, meaning that its evolution is
						determined by its initial state, requiring no further input. One interacts
						with the Game of Life by creating an initial configuration and observing
						how it evolves.
					</p>
					<a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>
						Learn More!
					</a>
				</AboutDiv>
			</HomeDiv>
		);
	}
}

export default Home;

const HomeDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const PlayButton = styled.button`
	color: white;
	background: #d6532c;
	text-transform: uppercase;
	padding: 10px 14px 8px 14px;
	border-radius: 5px;
	box-shadow: 0px 8px 17px 2px rgba(0, 0, 0, 0.14),
		0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2);
	border: none;
	font-size: 1.5rem;
	margin: 30% 0% 20% 0%;
	// outline: none !important;
	&:focus {
		outline: 0;
	}
	a {
		text-decoration: none;
	}
	&:hover {
		cursor: pointer;
		background: rgba(214, 83, 44, 0.75);
	}
`;

const RulesDiv = styled.div`
	height: auto;
	width: auto;
	padding: 1rem;
	font-weight: bold;
	text-align: left;
	color: black;
	font-weight: 500;
	border-radius: 5px;
	margin-top: 3%;
	margin-bottom: 4%;
	box-shadow: 0px 8px 17px 2px rgba(0, 0, 0, 0.14),
		0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2);
`;

const AboutDiv = styled.div`
	height: auto;
	width: 95%;
	padding: 1rem;
	font-weight: bold;
	text-align: center;
	color: black;
	font-weight: 500;
	border-radius: 5px;
	margin-top: 3%;
	margin-bottom: 4%;
	box-shadow: 0px 8px 17px 2px rgba(0, 0, 0, 0.14),
		0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2);
	a {
		text-decoration: none;
		color: black;
		font-style: italic;
		font-weight: 700;
		&:hover {
			cursor: pointer;
			color: #d6532c;
			transition: all 0.5s ease 0;
		}
	}
`;
