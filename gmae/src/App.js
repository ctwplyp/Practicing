import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Client from 'boardgame.io/client';
import Game from 'boardgame.io/game';

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

const App = Client({ game: TicTacToe });


export default App;
