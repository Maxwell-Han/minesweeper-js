const width = 9
const height = 9

const tds = []

const table = document.createElement("tbody")
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

const game = new Minesweeper(width, height)

document.getElementById("board").addEventListener("click", event => {
  if(event.target.tagName === 'TD') {
    const row = event.target.dataset.row
    const col = event.target.dataset.col
    const val = game.getTile(row, col)
    event.target.innerText = val
    const lastBoard = JSON.parse(JSON.stringify(game.board))
    game.flipTile(row, col)
    console.log(lastBoard)
    console.log('new board!', game.board)
    lastBoard.forEach( (row, r) => {
      row.forEach( (col, c) => {
        const lastVal = lastBoard[r][c]
        const newVal = game.getTile(r, c)
        console.log(lastVal, newVal)
        if(lastVal !== newVal && newVal !== 'B') {
          //get td based on row and col
          const targetTD = queryTD(r, c)
          console.log('changing the td html! ', targetTD)
          //reveal the td element
          const tdVal = game.getTile(r, c)
          targetTD.innerText = tdVal
          targetTD.classList.add(tdVal)
        }
      })
    })
  }
})

const queryTD = (row, col) => {
  const tdList = Array.from(document.querySelectorAll('td'))
  const foundTD = tdList.filter( el => {
    if(Number(el.dataset.row) == row && Number(el.dataset.col) == col) {
      return el
    }
  })[0]
  return foundTD
}

