const width = 9;
const height = 9;

const tds = [];

const table = document.createElement("tbody");
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

const game = new Minesweeper(width, height);
game.seedBoard();
game.reveal();

document.getElementById("board").addEventListener("click", event => {
  if (event.target.tagName !== "TD") return;

  const row = event.target.dataset.row;
  const col = event.target.dataset.col;
  const val = game.board[row][col].val;
  const currentTileVal = game.board[row][col].val;
  // console.log('clicked tile is ', currentTileVal);

  // const lastBoard = JSON.parse(JSON.stringify(game.board))
  const lastBoard = []
  game.board.forEach(row => {
    let tempRow = []
    row.forEach(tile => {
      let copy = {...tile}
      tempRow.push(copy)
    });
    lastBoard.push(tempRow)
  });

  // flip tile and check neighbors recursively
  game.board[row][col].flipTile();
  // console.log('flipped a tile')

  // update class names for styling board
  // game.board.forEach( (row, r) => {
  //   row.forEach( (col, c) => {
  //     const tile = game.board[r][c]
  //     if(tile.val != 'E' && tile.val != 'B') {
  //       console.log('rendering tile')
  //       const targetTD = queryTD(r, c)
  //       targetTD.classList.toggle(getTileClass(tile.val))
  //     }
  //   })
  // })

  lastBoard.forEach((row, r) => {
    row.forEach((col, c) => {
      const lastVal = lastBoard[r][c].val
      const newVal = game.board[r][c].val;
      // console.log('last vs new tile vals ', lastVal, newVal)
      if(lastVal !== newVal) {
        // console.log('We have a new tile vale, ', newVal)
      }
      if (lastVal !== newVal && newVal !== "B") {
        //get td based on row and col
        const targetTD = queryTD(r, c);
        // console.log('the target TD is ', targetTD)
        //reveal the td element
        const tdVal = game.board[r][c].val;
        if (tdVal !== 0 && tdVal !== "E") {
          targetTD.innerText = tdVal;
        }
        targetTD.classList.toggle(getTileClass(tdVal));
      }
    });
    console.log(game.reveal())
  });

  // don't process move if tile already flipped
  if (currentTileVal !== "E" && currentTileVal !== "B") return;

  // check current tile for bomb before running flipTile logic
  game.processMove(row, col);
  if (game.gameOver) {
    console.log("WE GOT BOMBED: GAME OVER");
    event.target.classList.add("tile-bomb");
    // re render board showing all bombs and prevent further interaction
  }

  // update tiles for neighbors
});

const queryTD = (row, col) => {
  const tdList = Array.from(document.querySelectorAll("td"));
  const foundTD = tdList.filter(el => {
    if (Number(el.dataset.row) == row && Number(el.dataset.col) == col) {
      return el;
    }
  })[0];
  return foundTD;
};

const getTileClass = val => {
  if (val === 0 || val === "E") {
    return "tile-clear";
  } else if (typeof Number(val) === "number") {
    return "tile-count";
  } else {
    return "tile-bomb";
  }
};
