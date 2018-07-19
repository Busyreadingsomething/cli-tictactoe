const readline = require('readline');

class App {
  constructor() {
    this.board = [
      ['_', '_', '_'],
      ['_', '_', '_'],
      ['_', '_', '_'],
    ];
    this.turn = 'X';
    this.winner = null;
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  isWinner(winner) {
    if (winner === 3) {
      return 'X';
    } else if (winner === -3) {
      return 'O';
    } else {
      return false;
    }
  }

  checkRow(row) {
    let winner = 0;
  
    for (const space of row) {
      if (space === 'X') {
        winner += 1;
      } else if (space === 'O') {
        winner -= 1;
      }
    }
  
    return this.isWinner(winner);
  }

  checkRows() {
    const { board } = this;
    for (const row of board) {
      const winner = this.checkRow(row);
      if (winner) {
        console.log('WINNER');
      }
    }
  }

  checkCol(col) {
    const { board } = this;
    let winner = 0;
    for (const row of board) {
      if (row[col] === 'X') {
        winner += 1;
      } else if (row[col] === 'O') {
        winner -= 1;
      }
    }

    return this.isWinner(winner);
  }

  checkCols() {
    const { board } = this;
    for (let col = 0; col < board.length; col += 1) {
      const winner = this.checkCol(col);
      if (winner) {
        console.log('WINNER');
      }
    }
  }
  
  checkWinner() {
    if (this.checkCols() || this.checkRows()) {
      console.log(this.turn, 'WINS');
      this._rl.close();
    }
  }

  makeMove() {
    this._rl.question('\nPick a ROW: ', (x) => {
      this._rl.question('\nPick a COLUMN: ', (y) => {
        console.log('\nYou played:', x, y, '\n');
        const row = parseInt(x, 10);
        const col = parseInt(y, 10);
        if (this.board[row][col] === '_') {
          this.board[row][col] = this.turn;
          this.checkWinner();
          this.turn = this.turn === 'X' ? 'O' : 'X';
          this.render();
        } else {
          console.log('-----TRY AGAIN-----');
          this.render();
        }
      })
    });
  }


  render() {
    const board = this.board.map(row => JSON.stringify(row)).join('\n\n');
    console.log(board);
    this.makeMove();
  }
}

const test = new App();
test.render();