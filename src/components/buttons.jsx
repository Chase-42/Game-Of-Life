import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';

class Buttons extends React.Component {
	handleSelect = (eventKey) => {
		this.props.gridSize(eventKey);
		setTimeout(() => {
			this.props.random();
		}, 200);
	};

	render() {
		return (
			<div className='center'>
				{this.props.engaged ? (
					<Button className='btn btn-default mr-1' onClick={this.props.pauseButton}>
						Pause
					</Button>
				) : (
					<Button className='btn btn-default mr-1' onClick={this.props.playButton}>
						Play
					</Button>
				)}
				<Button className='btn btn-default mr-1' onClick={this.props.clear}>
					Clear
				</Button>
				<Button className='btn btn-default mr-1' onClick={this.props.slow}>
					Slow
				</Button>
				<Button className='btn btn-default mr-1' onClick={this.props.fast}>
					Fast
				</Button>
				<Button className='btn btn-default mr-1' onClick={this.props.random}>
					Random
				</Button>

				<DropDownDiv>
					<Dropdown>
						<Dropdown.Toggle title='Grid Size' id='size-menu' variant='secondary'>
							GRID SIZE
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item eventKey='1' onSelect={this.handleSelect}>
								20x10
							</Dropdown.Item>
							<Dropdown.Item eventKey='2' onSelect={this.handleSelect}>
								50x30
							</Dropdown.Item>
							<Dropdown.Item eventKey='3' onSelect={this.handleSelect}>
								70x50
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</DropDownDiv>
			</div>
		);
	}
}

export default Buttons;

const Button = styled.button`
	color: white;
	background: #d6532c;
	text-transform: uppercase;
	border-radius: 7px;
	box-shadow: 0px 8px 17px 2px rgba(0, 0, 0, 0.14),
		0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2);
	border: none;
	font-size: 0.5rem;
	padding: 0.25rem 0.5rem 0.25rem 0.5rem;
	a {
		text-decoration: none;
	}
	&:hover {
		cursor: pointer;
		color: black;
		background: #537b85;
		transition: all 0.5s ease 0;
	}
	&: focus {
		box-shadow: none !important;
	}
	@media (max-width: 570px) {
		width: 50%;
		margin-top: 1rem;
		padding: 0.5rem 0.75rem 0.5rem 0.75rem;
		font-size: 0.8rem;
	}
`;

const DropDownDiv = styled.div`
	button {
		font-size: 0.5rem;
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
		margin-bottom: 0.1rem;
		@media (max-width: 570px) {
			width: 10.7rem;
			margin-top: 1rem;
			padding: 0.5rem 0.75rem 0.5rem 0.75rem;
			font-size: 0.8rem;
		}
	}
`;
