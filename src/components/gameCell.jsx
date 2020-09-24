import React from 'react';
import styled from 'styled-components';

const game_cell = 20; //cell size

class GameCell extends React.Component {
	render() {
		const { x, y } = this.props;
		return (
			<CellDiv
				style={{
					left: `${game_cell * x + 1}px`,
					top: `${game_cell * y + 1}px`,
					width: `${game_cell - 1}px`,
					height: `${game_cell - 1}px`,
				}}
			/>
		);
	}
}

export default GameCell;

const CellDiv = styled.div`
	background: #d6532c;
	position: absolute;
`;
