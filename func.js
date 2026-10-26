// Grab references to the page elements the game needs to interact with.
let box=document.querySelectorAll(".box");
let resetgame=document.querySelector("#reset");
let newgame=document.querySelector("#new");
let mc=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnMsg=document.querySelector("#turn");
// true = it's "o"'s turn, false = it's "x"'s turn. "o" always moves first.
let turn1 = true; 
// Counts moves made so far; used to detect a draw once all 9 boxes are filled.
let c = 0; 

// Every way to win on a 3x3 board, using box indexes laid out as:
//   0 | 1 | 2
//   3 | 4 | 5
//   6 | 7 | 8
// (3 rows, 3 columns, 2 diagonals)
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
// Attach a click handler to every box on the board.
box.forEach((b)=>{
    b.addEventListener("click",()=>{
        // Place the current player's mark, then hand the turn to the other player.
        if(turn1){
            b.innerText="o";
            turn1=false;
        }
        else{
            b.innerText="x";
            turn1=true;
        }
        // Show whose move is next.
        turnMsg.innerText = turn1 ? "Turn: o" : "Turn: x";
        // Lock the box so the same square can't be played twice.
        b.disabled=true;
        c++;
        // checkWinner() returns true on a win, otherwise undefined (falsy).
        let isWinner = checkWinner();

    // All 9 boxes filled with no winner means the game is a draw.
    if (c === 9 && !isWinner) {
      gameDraw();
    }
    });
});
// Shows the draw message and stops further moves.
const gameDraw=()=>{
  msg.innerText='game is draw';
  mc.classList.remove("hide");
  disableBoxes();
}
// Clears every box and makes it clickable again (used when starting over).
const enableBoxes = () => {
    for (let b of box) {
      b.disabled = false;
      b.innerText = "";
    }
  };
  // Locks every box so no more moves can be made after the game ends.
  const disableBoxes = () => {
    for (let b of box) {
      b.disabled = true;
    }
  };
  // Displays the winning player's mark and ends the game.
  const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is "${winner}"`;
    mc.classList.remove("hide");
    disableBoxes();
    
  };
// Checks each winning pattern to see whether one player owns all three boxes.
const checkWinner=()=>{
    for(let pattern of winPatterns){
        // Read the marks currently in the three boxes of this pattern.
        let p1=box[pattern[0]].innerText;
        let p2=box[pattern[1]].innerText;
        let p3=box[pattern[2]].innerText;
    
    // Skip patterns that still have an empty box; they can't be a win yet.
    if (p1!= "" && p2!= "" && p3!= "") {
        // All three marks match, so that player has won.
        if (p1 === p2 && p2 === p3) {
          showWinner(p1);
          return true;
        }
      }
    }
  };
  // Restores the starting state: "o" moves first, move count is zero, board is cleared, message is hidden.
  const resetGame = () => {
    turn1 = true;
    c = 0;
    turnMsg.innerText = "Turn: o";
    enableBoxes();
    mc.classList.add("hide");
  };
  // Both the "New Game" and "Reset" buttons do the same thing: start a fresh game.
  newgame.addEventListener("click", resetGame);
resetgame.addEventListener("click", resetGame);