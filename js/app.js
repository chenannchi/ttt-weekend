/*-------------------------------- Constants --------------------------------*/
const winningCombos = 
[[0,1,2], [3,4,5], [6,7,8]
,[0,3,6], [1,4,7], [2,5,8]
,[0,4,8], [2,4,6]]

const resetBtnEl = document.getElementById("reset")

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner


/*------------------------ Cached Element References ------------------------*/
let squareEls = document.querySelectorAll(".square")

let messageEl = document.getElementById("message")

let boardEl = document.getElementById("game-board")

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener("click",handleClick)

resetBtnEl.addEventListener("click",init)

/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  // resetBtnEl.setAttribute("hidden",true)
  board = new Array(9).fill(null)
  board.forEach(function(ele,idx){
    squareEls[idx].textContent = ""
  })

  turn = 1
  winner = null

  render()
}

function render(){ 
  board.forEach(function(element, idx){
    if(element === -1){
      squareEls[idx].setAttribute("class","jack-o-lantern")
      squareEls[idx].innerHTML = '<img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/jack-o-lantern_1f383.png" style="margin:20px;width:100px">'
    }else if(element === 1){
      squareEls[idx].setAttribute("class","ghost")
      squareEls[idx].innerHTML = '<img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/ghost_1f47b.png"  style="margin:20px;width:100px">'
    }else{
      squareEls[idx].setAttribute("class","blank")
    }
  });

  if(winner === null){
    if (turn === 1){
      messageEl.textContent = "GHOST, it's your turn!"
    }else{
      messageEl.textContent = "JACK-O-LATERN, it's your turn!"
    }
  }else if (winner === "T"){
    messageEl.textContent = "It's a tie!"
  }else{
    if (winner === 1){
      messageEl.textContent = "Player GHOST win!"
    }else{
      messageEl.textContent = "Player JACK-O-LANTERN win!"
    }
  }
}

function handleClick(evt){
  const sqIdx = parseInt(evt.target.id[evt.target.id.length-1])

  if(board[sqIdx]){
    return 
  }else if (winner!==null){
    return
  }

  board[sqIdx] = turn
  turn *= -1
  winner = getWinner()
  render()
}

function getWinner(){
  winningCombos.forEach(function(combo){
    let sum = board[combo[0]]+board[combo[1]]+board[combo[2]]
    if(Math.abs(sum) === 3){
      winner = board[combo[0]]
    }
  })

  if(Math.abs(winner) !== 1){
    if (!board.includes(null)){
      winner = "T"
    }else{
      winner = null
    }
  }
  return winner
}
