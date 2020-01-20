
class Minesweeper {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.board = this.makeBoard()
    this.bombCount = 10
  }
  makeBoard() {
    let board = []
    for(let i = 0; i < this.height; i++) {
      let row = []
      for(let j = 0; j < this.width; j++) {
        row.push('E')
      }
      board.push(row)
    }
    return board
  }
  getTile(row, col) {
    if(row < 0 || col < 0) return false
    if(row >= this.height || col >= this.width) return false
    return this.board[row][col]
  }
  setTile(value, row, col) {
    if(this.getTile(row, col)) {
      this.board[row][col] = value
    }
  }
  seedBoard() {
    let i  = 0
    while(i < this.bombCount) {
      let row = Math.floor(Math.random() * this.height)
      let col = Math.floor(Math.random() * this.width)
      if(this.getTile(row, col) && this.getTile(row, col) !== 'B') {
        this.setTile('B', row, col)
        i++
      }
    }
  }
  flipTile(row, col) {
    if(!getTile) return
    // check if bombed.  check neighboring bomb count
  }
}
