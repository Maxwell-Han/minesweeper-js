class Tile {
  constructor(game, coords, val) {
    this.game = game;
    this.coords = coords;
    this.val = val;
    this.revealed = false;
  }
  // click will grab tile from board[row][col] and tile will call .flipTile
  getNeighbors() {
    const neighbors = [];
    let rowIdx = this.coords[0];
    let colIdx = this.coords[1];
    for (let r = rowIdx - 1; r <= rowIdx + 1; r++) {
      if (r < 0 || r >= this.game.height) continue;
      for (let c = colIdx - 1; c <= colIdx + 1; c++) {
        if (c < 0 || c >= this.game.width) continue;
        if (r === rowIdx && c === colIdx) continue;
        if (!!this.game.board[r][c]) {
          neighbors.push(this.game.board[r][c]);
        }
      }
    }

    return neighbors;
  }
  flipTile() {
    if (this.val === "B") return;
    if (this.val !== "E") return;
    // mark tile as flipped
    this.revealed = true;
    let neighbors = this.getNeighbors();
    let bombCount = neighbors.filter(tile => tile.val === "B").length;
    if (bombCount > 0) {
      this.val = bombCount;
      return;
    } else {
      this.val = 0;
    }

    neighbors.forEach(tile => {
      tile.flipTile();
    });
  }
}

class Minesweeper {
  constructor(width = 9, height = 9, bombCount = 10) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
    this.bombCount = bombCount;
    this.gameOver = false;
  }
  makeBoard() {
    let board = [];
    for (let r = 0; r < this.height; r++) {
      let row = [];
      for (let c = 0; c < this.width; c++) {
        let tile = new Tile(this, [r, c], "E");
        row.push(tile);
      }
      board.push(row);
    }
    return board;
  }

  seedBoard() {
    let i = 0;
    while (i < this.bombCount) {
      let row = Math.floor(Math.random() * this.height);
      let col = Math.floor(Math.random() * this.width);
      if (this.board[row][col] && this.board[row][col] !== "B") {
        this.board[row][col].val = "B";
        i++;
      }
    }
  }
  getClearedTileCount() {
    const flippedTiles = this.board.reduce((accum, row) => {
      let flipped = row.filter(tile => {
        return tile.revealed;
      }).length;
      return accum + flipped;
    }, 0);
    return flippedTiles;
  }

  getBombCount() {
  const bombs = this.board.reduce((accum, row) => {
    let flipped = row.filter(tile => {
      return tile.val == 'B';
    }).length;
    return accum + flipped;
  }, 0);
  return bombs;
}

  processMove(row, col) {
    let tile = this.board[row][col];
    if (tile.val === "B") {
      this.gameOver = true;
      this.board = this.revealGameOver();
    }
  }

  reveal() {
    return this.board.map(row => {
      return row.map(tile => {
        return tile.val;
      });
    });
  }

  peek() {
    return this.board.map(row => {
      return row.map(tile => {
        if(tile.val === 'B') {
          return tile.val
        } else {
          return ''
        }
      });
    });
  }

  getCopyBoard() {
    const lastBoard = []
    this.board.forEach(row => {
      let tempRow = []
      row.forEach(cell => {
        let copy = {...cell}
        tempRow.push(copy)
      })
      lastBoard.push(tempRow)
    })
    return lastBoard
  }

  revealGameOver() {
    return this.board.map(row => {
      return row.map(tile => {
        if (tile.val === "B") {
          return "B";
        } else {
          return "E";
        }
      });
    });
  }

  cheat() {
    return this.board.map(row => {
      return row.map(tile => {
        if (tile.val === "B") return "B";
        else return "";
      });
    });
  }
}
