import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Client from 'boardgame.io/client';
import Game from 'boardgame.io/game';

class TicTacToeBoard extends React.Component {
  onClick(id) {
    if (this.props.G.winner == null) {
      this.props.moves.clickCell(id);
      this.props.endTurn();
    }
  }

  render() {
    let winner = '';
    if (this.props.G.winner !== null) {
      winner = <div>Winner: {this.props.G.winner}</div>;
    }

    const cellStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
    };

    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        cells.push(
          <td style={cellStyle}
              key={id}
              onClick={() => this.onClick(id)}>
            {this.props.G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
        <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}

function IsVictory(cells){
	if (cells[0]!=null)
	return true;
}

const TicTacToe = Game({
  G: { cells: Array(9).fill(null) },

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];
      if (cells[id] == null) {
      	cells[id] = ctx.currentPlayer;
	}
      	let winner = null;
	if (IsVictory(cells)) {
		winner = ctx.currentPlayer;
	}

	return {...G, cells, winner};      // don't mutate original state.
    }
  }
});

const App = Client({ game: TicTacToe,
		    board: TicTacToeBoard });


export default App;
