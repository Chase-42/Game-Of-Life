import React from 'react';
// Components
import Grid from './grid';
import Buttons from './buttons';
// Styles
import { InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

class Game extends React.Component {
	constructor() {
		super();
		// Initial speed & grid size (for initial render) not for propagating through whole app
		this.speed = 100;
		this.rows = 20;
		this.cols = 30;

		this.state = {
			generation: 0,
			// Grid state (referencing above rows & cols)
			// An array of this.rows filled with a map of another array of this.cols set to false (two dimensional array)
			gridFull: Array(this.rows)
				.fill()
				.map(() => Array(this.cols).fill(false)),
		};
	}

	componentDidMount() {
		this.random();
		this.playButton();
	}

	// Selecting a box (switch from false to true or vice versa)
	selectBox = (row, col) => {
		// Create clone of gridFull array by mapping through the nested arrays
		const gridFull = this.state.gridFull.map((rowArr, rowIdx) =>
			rowArr.map((item, colIdx) =>
				// Find square that was clicked and set to opposite
				rowIdx === row && colIdx === col ? !item : item
			)
		);
		// Update state
		this.setState(() => ({ gridFull }));
	};

	// Randomize the board with randomly selected boxes
	random = () => {
		// Map through the nested arrays
		const gridFull = this.state.gridFull.map((rowArr) =>
			rowArr.map(
				() =>
					// Create random number
					Math.floor(Math.random() * 3) === 1
				// If it equals 1 it will return true (turning on the square)
			)
		);
		// Update state
		this.setState(() => ({ gridFull }));
	};

	// Starts iteration
	playButton = () => {
		// Sets engaged to true (swapping play & pause buttons)
		this.setState({ engaged: true });
		// First, start over with clearing the timer
		clearInterval(this.intervalId);
		// Start calling this.play at this.speed
		// Every 100 milliseconds call this.play
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

	// Main logic for game
	play = () => {
		// Two copies of the grid
		let g = this.state.gridFull;
		let g2 = arrayClone(this.state.gridFull);
		// Check g to see which squares are on(true) and change g2
		// Then we setState with the clone at the end

		// Loop through the nested arrays
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				// Initialize count (number of alive (true) neighbors)
				let count = 0;
				// Check all neighbors (8 squares) and if true increase count (alive neighbors)
				if (i > 0) if (g[i - 1][j]) count++;
				if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
				if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
				if (j < this.cols - 1) if (g[i][j + 1]) count++;
				if (j > 0) if (g[i][j - 1]) count++;
				if (i < this.rows - 1) if (g[i + 1][j]) count++;
				if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
				if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
				// If less than 2 or more than 3 the cell dies (false)
				if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
				// If dead (false) and has 3 neighbors it is turned on (alive)
				if (!g[i][j] && count === 3) g2[i][j] = true;
			}
		}
		// Update grid with g2 copy & iterate 1 to generation state
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
						random={this.random}
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

const InputDiv = styled.div`
	width: 15rem;
	margin: 1rem auto;
`;
