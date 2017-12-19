import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Client from 'boardgame.io/client';
import Game from 'boardgame.io/game';

const TicTacToe = Game({
  G: { cells: Array(9).fill(null) },

  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells];  // don't mutate original state.
      cells[id] = ctx.currentPlayer;
      return {...G, cells};      // don't mutate original state.
    }
  }
});

const App = Client({ game: TicTacToe });


export default App;
