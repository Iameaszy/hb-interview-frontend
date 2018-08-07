import React, { Component } from 'react';
import './App.css';

import { Tr } from './components/board';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      sprite: 0,
      width: 0,
      height: 0,
      board: [],
      midHeight: 0,
      midWidth: 0,
      moves: 0,
    };
    this.start = this.start.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.drawBoard = this.drawBoard.bind(this);
    this.generatePlayer = this.generatePlayer.bind(this);
    this.generateSprites = this.generateSprites.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);
    this.right = this.right.bind(this);
    this.left = this.left.bind(this);
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.checkBoard = this.checkBoard.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  checkBoard() {
    const board = this.state.board;
    let ghostStat = true;

    loop: for (let row of board) {
      for (let col of row) {
        ghostStat = /sprite/.test(col.player);
        if (ghostStat) {
          break loop;
        }
      }
    }
    if (!ghostStat) {
      let moves = this.state.moves;
      setTimeout(
        () => alert(`Game over. You save the preincess with ${moves} moves`),
        100,
      );
    }
  }

  handleKeydown(e) {
    switch (e.key) {
      case 'ArrowUp':
        this.up();
        break;
      case 'ArrowLeft':
        this.left();
        break;
      case 'ArrowRight':
        this.right();
        break;
      case 'ArrowDown':
        this.down();
        break;
      default:
        return null;
    }
  }

  right() {
    let posX = this.state.midWidth;
    let newPos = posX + 1;
    let posY = this.state.midHeight;
    const width = this.state.width;
    const board = this.state.board;
    let moves = this.state.moves;
    board[posY][posX] = { player: 'empty' };

    if (newPos < width) {
      board[posY][posX] = { player: 'empty' };
      board[posY][newPos] = { player: 'player' };
      this.setState({ board, midWidth: newPos, moves: ++moves });
      this.checkBoard();
    }
  }
  left() {
    let posX = this.state.midWidth;
    let newPos = posX - 1;
    let posY = this.state.midHeight;
    const board = this.state.board;
    let moves = this.state.moves;

    board[posY][posX] = { player: 'empty' };

    if (newPos >= 0) {
      board[posY][posX] = { player: 'empty' };
      board[posY][newPos] = { player: 'player' };
      this.setState({ board, midWidth: newPos, moves: ++moves });
      this.checkBoard();
    }
  }
  down() {
    let height = this.state.height;
    let posY = this.state.midHeight;
    let newPos = posY + 1;
    let posX = this.state.midWidth;
    const board = this.state.board;
    let moves = this.state.moves;

    if (newPos < height) {
      board[posY][posX] = { player: 'empty' };
      board[newPos][posX] = { player: 'player' };
      this.setState({ board, midHeight: newPos, moves: ++moves });
      this.checkBoard();
    }
  }
  up() {
    let posY = this.state.midHeight;
    let newPos = posY - 1;
    let posX = this.state.midWidth;
    const board = this.state.board;
    let moves = this.state.moves;

    if (newPos >= 0) {
      board[posY][posX] = { player: 'empty' };
      board[newPos][posX] = { player: 'player' };
      this.setState({ board, midHeight: newPos, moves: ++moves });
      this.checkBoard();
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleWindowClick);
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keypress');
    window.removeEventListener('keydown');
  }
  handleWindowClick(e) {
    switch (e.key) {
      case '2':
        this.up();
        break;
      case '4':
        this.left();
        break;
      case '6':
        this.right();
        break;
      case '8':
        this.down();
        break;
      default:
        return null;
    }
  }

  start() {
    const width = +prompt('Please enter board width') || 5;
    const height = +prompt('Please enter board height') || 5;
    this.setState({ sprite: Math.max(width, height), height, width }, () => {
      this.drawBoard();
    });
  }

  render() {
    return (
      <div className="App">
        {!this.state.start && (
          <div className="start">
            <button type="button" onClick={this.handleClick}>
              Run with JS
            </button>
            <div className="info">
              <h1>Save the Princess </h1>
              <div className="princess" />
            </div>
          </div>
        )}
        {this.state.start && (
          <div className="game-page">
            <div className="instruction">
              <p>
                Use key <kbd>2</kbd>, <kbd>8</kbd>, <kbd>4</kbd> and &nbsp;
                <kbd>6</kbd> or &uarr; &darr; &larr; and &rarr; arrow key to
                move player <em>up</em>,
                <em>down</em>,
                <em>left</em>, <em>right</em>
              </p>
            </div>
          </div>
        )}
        <table className="Table">
          <tbody>{this.state.start && <Tr board={this.state.board} />}</tbody>
        </table>
      </div>
    );
  }

  handleClick(e) {
    this.start();
    this.setState({ start: true });
  }

  drawBoard() {
    const height = this.state.height;
    const width = this.state.width;
    const board = [];

    for (let i = 0; i < height; i++) {
      const col = [];
      for (let j = 0; j < width; j++) {
        col.push({ player: 'empty' });
      }
      board.push(col);
    }
    this.setState({ board }, () => {
      // generate the player
      this.generatePlayer();
      //Generate the sprite
      this.generateSprites();
    });
  }
  generatePlayer() {
    const height = this.state.height;
    const width = this.state.width;
    const midWidth = Math.floor((width - 1) / 2);
    const midHeight = Math.floor((height - 1) / 2);
    const board = this.state.board;

    // Generate player
    board[midHeight][midWidth] = { player: 'player' };
    this.setState({ board });
  }

  generateSprites() {
    const height = this.state.height;
    const width = this.state.width;
    const midWidth = Math.floor((width - 1) / 2);
    const midHeight = Math.floor((height - 1) / 2);
    const board = this.state.board;
    this.setState({ midHeight, midWidth });

    const spritesLength = Math.min(height, width);
    let randomRow, randomCol;
    for (let i = 0; i < spritesLength; i++) {
      randomRow = Math.floor(Math.random() * height);
      randomCol = Math.floor(Math.random() * width);
      if (midHeight !== randomRow && midWidth !== randomCol) {
        board[randomRow][randomCol] = { player: 'sprite' };
        this.setState({ board });
      } else {
        randomRow = Math.floor(Math.random() * height);
        randomCol = Math.floor(Math.random() * width);
        if (midHeight !== randomRow && midWidth !== randomCol) {
          board[randomRow][randomCol] = { player: 'sprite' };
          this.setState({ board });
        }
      }
    }
  }
}

export default App;
