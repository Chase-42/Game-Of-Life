import React from 'react';

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
	// Dynamic width of grid
	const width = props.cols * 16;
	// boxClass initialization before mapping
	let boxClass = '';
	// Map through gridFull prop (An array of this.rows filled with a map of another array of this.cols set to false (two dimensional array))
	const rowsArr = props.gridFull.map((rowArr, rowIdx) =>
		// Map through rowArr to get column index
		rowArr.map((item, colIdx) => {
			// Initialize boxId (dynamic of both row and col indexes)
			const boxId = `${rowIdx}_${colIdx}`;
			// Check the gridFull prop at each index and see if true or false
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

export default Grid;
