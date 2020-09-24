import React from 'react';
import { Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

class Box extends React.Component {
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col);
	};

	render() {
		return (
			<div
				className={this.props.boxClass}
				id={this.props.id}
				onClick={this.selectBox}
			/>
		);
	}
}

const Grid = (props) => {
	const width = props.cols * 14.02;
	let boxClass = '';
	const rowsArr = props.gridFull.map((rowArr, rowIdx) =>
		rowArr.map((item, colIdx) => {
			const boxId = `${rowIdx}_${colIdx}`;

			boxClass = props.gridFull[rowIdx][colIdx] ? 'box on' : 'box off';
			return (
				<Box
					boxClass={boxClass}
					key={boxId}
					boxId={boxId}
					row={rowIdx}
					col={colIdx}
					selectBox={props.selectBox}
				/>
			);
		})
	);

	return (
		<div className='grid' style={{ width }}>
			{rowsArr}
		</div>
	);
};

class Buttons extends React.Component {
	handleSelect = (eventKey) => {
		this.props.gridSize(eventKey);
		setTimeout(() => {
			this.props.seed();
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
				<Button className='btn btn-default mr-1' onClick={this.props.seed}>
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

class Game extends React.Component {
	constructor() {
		super();

		this.speed = 100;
		this.rows = 20;
		this.cols = 30;

		this.state = {
			generation: 0,
			gridFull: Array(this.rows)
				.fill()
				.map(() => Array(this.cols).fill(false)),
		};
	}

	componentDidMount() {
		this.seed();
		this.playButton();
	}

	selectBox = (row, col) => {
		const gridFull = this.state.gridFull.map((rowArr, rowIdx) =>
			rowArr.map((item, colIdx) =>
				rowIdx === row && colIdx === col ? !item : item
			)
		);
		this.setState(() => ({ gridFull }));
	};

	seed = () => {
		const gridFull = this.state.gridFull.map((rowArr) =>
			rowArr.map(() => Math.floor(Math.random() * 2) === 1)
		);
		this.setState(() => ({ gridFull }));
	};

	playButton = () => {
		this.setState({ engaged: true });
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
	};

	pauseButton = () => {
		this.setState({ engaged: false });
		clearInterval(this.intervalId);
	};

	slow = () => {
		this.speed = 1000;
		this.playButton();
	};

	fast = () => {
		this.speed = 100;
		this.playButton();
	};

	clear = () => {
		const gridFull = Array(this.rows)
			.fill()
			.map(() => Array(this.cols).fill(false));

		this.setState(() => ({
			gridFull,
			generation: 0,
		}));
	};

	gridSize = (size) => {
		switch (size) {
			case '1':
				this.rows = 20;
				this.cols = 40;
				break;
			case '2':
				this.rows = 30;
				this.cols = 50;
				break;
			default:
				this.rows = 50;
				this.cols = 70;
		}
		this.clear();
	};

	play = () => {
		let g = this.state.gridFull;
		let g2 = arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let count = 0;
				if (i > 0) if (g[i - 1][j]) count++;
				if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
				if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
				if (j < this.cols - 1) if (g[i][j + 1]) count++;
				if (j > 0) if (g[i][j - 1]) count++;
				if (i < this.rows - 1) if (g[i + 1][j]) count++;
				if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
				if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
				if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
				if (!g[i][j] && count === 3) g2[i][j] = true;
			}
		}
		this.setState((prevState) => ({
			gridFull: g2,
			generation: prevState.generation + 1,
		}));
	};
	handleInterval = (e) => {
		this.speed = e.target.value;
		this.playButton();
	};

	render() {
		return (
			<GameDiv>
				<div>
					<Buttons
						playButton={this.playButton}
						pauseButton={this.pauseButton}
						slow={this.slow}
						fast={this.fast}
						clear={this.clear}
						seed={this.seed}
						gridSize={this.gridSize}
						engaged={this.state.engaged}
					/>
					<Grid
						gridFull={this.state.gridFull}
						rows={this.rows}
						cols={this.cols}
						selectBox={this.selectBox}
					/>
					<InputDiv>
						<InputGroup size='sm' className='input'>
							<InputGroup.Prepend>
								<InputGroup.Text id='basic-addon1' style={{ fontSize: '.85rem' }}>
									Speed (in milliseconds){' '}
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								aria-describedby='basic-addon1'
								value={this.speed}
								onChange={this.handleInterval}
								onClick={this.handleInterval}
								style={{ fontSize: '.85rem' }}
							/>
						</InputGroup>
					</InputDiv>

					<GenerationDiv>Generations:{this.state.generation}</GenerationDiv>
				</div>
			</GameDiv>
		);
	}
}

export default Game;

const GameDiv = styled.div`
	margin-top: 2%;
`;

const GenerationDiv = styled.h3`
	background-color: #e6b8a5;
	font-size: 1rem;
	margin-top: 1%;
	border-radius: 5px;
	font-weight: lighter;
	letter-spacing: 0.5rem;
	padding: 0.25rem;
	width: 17rem;
	box-shadow: 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
		0px 9px 46px 8px rgba(0, 0, 0, 0.12), 0px 11px 15px -7px rgba(0, 0, 0, 0.2);
	@media (max-width: 570px) {
		font-size: 1.5rem;
		width: 20rem;
	}
`;

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

const InputDiv = styled.div`
	width: 15rem;
	margin: 1rem auto;
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
