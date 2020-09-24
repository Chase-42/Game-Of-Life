import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<HeaderDiv>
				<Link to='/'>
					<HomeButton>Go Home</HomeButton>
				</Link>
				<h1>John Conway's Game of Life</h1>
			</HeaderDiv>
		);
	}
}

export default Header;

const HeaderDiv = styled.header`
	background-color: #537b85;
	box-shadow: 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
		0px 9px 46px 8px rgba(0, 0, 0, 0.19), 0px 11px 15px -7px rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	h1 {
		margin: 0.75rem;
		font-size: 1.25rem;
		@media (max-width: 570px) {
			font-size: 1.75rem;
		}
	}
`;

const HomeButton = styled.button`
	color: white;
	background: #d6532c;
	text-transform: uppercase;
	padding: 0.25rem 0.5rem 0.25rem 0.5rem;
	border-radius: 5px;
	box-shadow: 0px 8px 17px 2px rgba(0, 0, 0, 0.14),
		0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2);
	border: none;
	font-size: 0.75rem;
	margin-right: 1.5rem;
	@media (max-width: 570px) {
		font-size: 1rem;
	}
	&:focus {
		outline: 0;
	}
	a {
		text-decoration: none;
	}
	&:hover {
		cursor: pointer;
		background: rgba(214, 83, 44, 0.75);
		animation: bounce 1s;
	}
	@keyframes bounce {
		0%,
		20%,
		60%,
		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		40% {
			-webkit-transform: translateY(-20px);
			transform: translateY(-20px);
		}

		80% {
			-webkit-transform: translateY(-10px);
			transform: translateY(-10px);
		}
	}
`;
