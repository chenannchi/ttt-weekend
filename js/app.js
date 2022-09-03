/*-------------------------------- Constants --------------------------------*/
// ## Step 5 - Define the required constants
// a) In a constant called `winningCombos` define the eight possible winning combinations as an array of arrays.
const winningCombos = 
[[0,1,2], [3,4,5], [6,7,8]
,[0,3,6], [1,4,7], [2,5,8]
,[0,4,8], [2,4,6]]

// 8-b) Store the new reset button element in a constant named resetBtnEl.
const resetBtnEl = document.getElementById("reset")

/*---------------------------- Variables (state) ----------------------------*/
// Step 1 - Define the required variables used to track the state of the game
// a) Use a variable named `board` to represent the state of the squares on the board.
// b) Use a variable named `turn` to track whose turn it is.
// c) Use a variable named `winner` to represent if anyone has won yet, or if a tie has occurred.
let board, turn, winner


/*------------------------ Cached Element References ------------------------*/
// Step 2 - Store cached element references
// a) In a constant called squareEls, store the nine elements representing the squares on the page.
let squareEls = document.querySelectorAll(".square")

// b) In a constant called messageEl, store the element that displays the game’s status on the page.
let messageEl = document.getElementById("message")

// console.log("square", squareEls)
// console.log("message",messageEl)

// 6-b
let boardEl = document.getElementById("game-board")

/*----------------------------- Event Listeners -----------------------------*/

// 6-b) Attach an event listener to the game board (you can do this to each one of the existing squareEls OR add a new cached element reference that will allow you to take advantage of event bubbling). On the 'click' event, it should call the handleClick function you created in 6a.
boardEl.addEventListener("click",handleClick)

resetBtnEl.addEventListener("click",init)

/*-------------------------------- Functions --------------------------------*/

// Step 3 - Upon loading, the game state should be initialized, and a function should be called to render this game state

// b) Call this `init` function when the app loads.
init()

// a) Create a function called `init`.
function init(){
  // console.log("snaity check")
  
  // c) Set the board variable to an array containing nine nulls to represent empty squares.
  board = new Array(9).fill(null)
  // board[0] = 1
  // board[1] = 0
  // board[2] = -1
  // console.log("board",board)

  // d) Set the turn to 1 - which will represent player X. Player O will be represented by -1
  turn = 1

  // e) Set the winner to null.
  // null: no winner or tie yet
  // 1: player X has won
  // -1: player O has won
  // 'T': tie
  // other: game is over!
  winner = null

  // f) Call a function called render at the end of the init function.
  render()
}

// Step 4 - The state of the game should be rendered to the user

function render(){
  // console.log(board)
  board.forEach(function(element, idx){
    // console.log("squareEls",squareEls[idx])
    // console.log("element", element)
    if(element === -1){
      squareEls[idx].setAttribute("class", "horse")
    }else if(element === 1){
      squareEls[idx].setAttribute("class","crocodile")
    }else{
      squareEls[idx].setAttribute("class","blank")
    }
  });


  // console.log(`render : winner is ${winner}`)

  if(winner === null){
    // console.log(`render 2 : winner === ${winner}`)
    if (turn === 1){
      messageEl.textContent = "Player X, it's your turn!"
    }else{
      messageEl.textContent = "Player O, it's your turn!"
    }
  }else if (winner === "T"){
    messageEl.textContent = "It's a tie!"
  }else{
    if (winner === 1){
      messageEl.textContent = "Player X win!"
    }else{
      messageEl.textContent = "Player O win!"
    }
  }
}

// ## Step 6 - Handle a player clicking a square with a `handleClick` function
// a) Create a function called `handleClick`. It will have an `evt` parameter.
function handleClick(evt){
  // console.log("clicked")
  // console.log("target",evt.target.id)
  // c) Obtain the index of the square that was clicked by "extracting" the index from an id assigned to the element in the HTML. Assign this to a constant called sqIdx.
  const sqIdx = parseInt(evt.target.id[evt.target.id.length-1])
  // console.log("sqIdx",sqIdx)
  // console.log("typeOf sqIdx",typeof (sqIdx))

  // d) If the `board` has a value at the `sqIdx`, immediately `return` because that square is already taken. Also, if `winner` is not `null`, immediately `return` because the game is over.

  if(board[sqIdx]){
    // console(`${board[sqIdx]} has a value`)
    return 
  }else if (winner!==null){
    return
  }

  // e) Update the board array at the sqIdx with the current value of turn.
  board[sqIdx] = turn
  // console.log(`add ${turn} to board${sqIdx}`)

  // f) Change the turn by multiplying `turn` by `-1` (this flips a `1` to `-1`, and vice-versa).
  turn *= -1
  // console.log(`change turn to ${turn}`)

  // g) Set the winner variable if there's a winner by calling a new function: getWinner.
  winner = getWinner()
  // console.log(`winner is ${winner}`)

  // h) All the state has been updated, so we need to render our updated state to the user by calling the `render` function that we wrote earlier.
  render()
}

// ## Step 7 - Build the `getWinner` function

function getWinner(){
  // b1) Loop through each of the winning combination arrays defined in the winningCombos array. Total up the three board positions using the three indexes in the current combo. Convert the total to an absolute value (convert any negative total to positive). If the total equals 3, we have a winner! Set the winner variable to the board's value at the index specified by the first index of that winning combination's array by returning that value.
  winningCombos.forEach(function(combo){
    let sum = board[combo[0]]+board[combo[1]]+board[combo[2]]
    if(Math.abs(sum) === 3){
      // console.log(`sum = ${sum}`)
      winner = board[combo[0]]
      // console.log(`there is a winner`)
      // console.log(`winner is ${winner}`)
    }
    // return winner
  })

  

  // console.log("woops")

  //  If there is no winner
  // c) check to see if there is a tie. Set the winner variable to 'T' if there are no more nulls in the board array by returning the string 'T'.
  // console.log(`winner is ${winner}`)
  if(Math.abs(winner) !== 1){
    if (!board.includes(null)){
      // console.log(`winner is ${winner}`)
      winner = "T"
      // console.log(`winner is ${winner}`)
    }else{
      // d) If there is no winner and there isn’t a tie, return null.
      winner = null
    }
  }
  
  return winner
}
