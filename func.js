let box=document.querySelectorAll(".box");
let resetgame=document.querySelector("#reset");
let newgame=document.querySelector("#new");
let mc=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turn1 = true; 
let c = 0; 

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
box.forEach((b)=>{
    b.addEventListener("click",()=>{
        if(turn1){
            b.innerText="o";
            turn1=false;
        }
        else{
            b.innerText="x";
            turn1=true;
        }
        b.disabled=true;
        c++;
        let isWinner = checkWinner();

    if (c === 9 && !isWinner) {
      gameDraw();
    }
    });
});
const gameDraw=()=>{
  msg.innerText='game is draw';
  mc.classList.remove("hide");
  disableBoxes();
}
const enableBoxes = () => {
    for (let b of box) {
      b.disabled = false;
      b.innerText = "";
    }
  };
  const disableBoxes = () => {
    for (let b of box) {
      b.disabled = true;
    }
  };
  const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is "${winner}"`;
    mc.classList.remove("hide");
    disableBoxes();
    
  };
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let p1=box[pattern[0]].innerText;
        let p2=box[pattern[1]].innerText;
        let p3=box[pattern[2]].innerText;
    
    if (p1!= "" && p2!= "" && p3!= "") {
        if (p1 === p2 && p2 === p3) {
          showWinner(p1);
          return true;
        }
      }
    }
  };
  const resetGame = () => {
    turn1 = true;
    c = 0;
    enableBoxes();
    mc.classList.add("hide");
  };
  newgame.addEventListener("click", resetGame);
resetgame.addEventListener("click", resetGame);