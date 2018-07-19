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