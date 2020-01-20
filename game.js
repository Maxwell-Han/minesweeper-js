
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
    if(!this.getTile) return
    // check if bombed.  check neighboring bomb count
    if(this.isBombed(row, col)) {
      // player chose a bomb and game ends
    }else {
      this.setTile(0, row, col)
    }
    this.revealSurroundingTiles(row, col)
  }
  isBombed(row, col) {
    return this.getTile(row, col) === 'B'
  }
  getSurroundingBombCount(row, col) {
    let bombCount = 0
    for(let offsetX = row - 1; offsetX < row + 2; offsetX++) {
      for(let offsetY = col - 1; offsetY < col + 2; offsetY++) {
        if(offsetX === row && offsetY === col) continue
        if(this.getTile(offsetX, offsetY) === 'B') bombCount++
      }
    }
    return bombCount
  }
  getSurroundingTiles(row, col) {
    const positions = []
    for(let offsetX = row - 1; offsetX < row + 2; offsetX++) {
      for(let offsetY = col - 1; offsetY < col + 2; offsetY++) {
        if(offsetX === row && offsetY === col) continue
        positions.push([offsetX, offsetY])
      }
    }
    return positions
  }
  revealSurroundingTiles(row, col) {
    //for each of a tiles neighbors, see if they are clear or have a bomb
    //if they are clear, check that tiles neighbors otherwise leave empty
    //if a bomb or show number of neighboring bombs
    let neighbors = this.getSurroundingTiles(row, col)
    neighbors.forEach( tilePos => {
      let tileRow = tilePos[0]
      let tileCol = tilePos[1]
      if(this.getTile(tileRow, tileCol) )helper.call(this, tileRow, tileCol)
    })
    function helper(row, col) {
      if(this.isBombed(row, col)) return
      let bombCount = this.getSurroundingBombCount(row, col)
      if(bombCount > 0) {
        this.setTile(bombCount, row, col) // set tile to show count
        return
      } else {
        this.flipTile(row, col)
      }
    }
  }
}
