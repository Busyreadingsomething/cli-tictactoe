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
      let winner = this.checkRow(row);
      if (winner) {
        console.log('WINNER');
      }
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
          this.turn = this.turn === 'X' ? 'O' : 'X';
          this.render();
        } else {
          console.log('-----TRY AGAIN-----');
          this.render();
        }
      })
    });
  }

  checkWinner(winner) {
    if (winner) {
      console.log(this.winner);
      this._rl.close();
    }
  }

  render() {
    const board = this.board.map(row => JSON.stringify(row)).join('\n\n');
    console.log(board);
    this.makeMove();
  }
}

const test = new App();
test.render();