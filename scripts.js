var timerInterval; // Store the interval so we can clear it
let gameStarted = false; // Game is initially blocked
let currentSymbol = 'x';
let data = [];
let complexity = 3;

function checkinput() {
           var inputValueP1 = document.getElementById("inputP1").value;
           var inputValueP2 = document.getElementById("inputP2").value;

           if(inputValueP1.trim() === "" || inputValueP2.trim()===""){
            alert("Player name can not be empty !!");
           }
           else{
            window.location.href = "index[1].html";
           }
}

function togglesPopup() {
  document.getElementById('popup-win').classList.toggle("active");
}
function togglesPopupTimeOver() {
  document.getElementById('popup-TimeOver').classList.toggle("active");
}

function closePopupAndRestart() {
    document.getElementById('popup-TimeOver').classList.remove("active"); 
    Timer(); 
}


function togglesPopupStart() {
  document.getElementById('popup-start').classList.toggle("active");
}

function Timer() {
  clearInterval(timerInterval); // Stop any existing timer
  var time = 20; // Always reset to 20 seconds

  timerInterval = setInterval(function () {
    
    if (time < 0) {
      clearInterval(timerInterval); 
      toggleSymbol();
      togglesPopupTimeOver();
      return;
    }

    var fewminutes = Math.floor(time / 60);
    var seconds = time % 60;

    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    time--; 

  }, 1000);
}

function bindClicks() {
  document.querySelectorAll('.row').forEach((row, rowIndex) => {
    row.querySelectorAll('.item').forEach((item, columnIndex) => {
      item.addEventListener('click', (event) => {
        if (!gameStarted){
          togglesPopupStart();
          return; // block clicks if game hasn't started
        }
        
        if (event.target.innerHTML) return; // block clicking on already filled cells

        event.target.innerHTML = currentSymbol;
        event.target.classList.add('full');
        onItemClick(rowIndex, columnIndex);
      });
    });
  });
}


function resetGame() {
  gameStarted = false;
  board.innerHTML = ''; 
  createBoard(); 
  bindClicks();

  clearInterval(timerInterval);

  currentSymbol = 'x'; 
  document.getElementById("current-turn").innerText = "-";

  document.getElementById("seconds").innerHTML = "20";

  document.querySelector(".startbtn").disabled = false; 

}
function startGame() {
  if (gameStarted) return; 

  gameStarted = true; 
  document.getElementById("current-turn").innerText = "X";
  document.querySelector(".startbtn").disabled = true;
  Timer(); 
}


function toggleSymbol() {
  if (currentSymbol === 'x') currentSymbol = 'o';
  else currentSymbol = 'x';
  document.getElementById("current-turn").innerText = currentSymbol.toUpperCase();
}

function setWinner() {
  document.getElementById('winner-id').innerHTML = currentSymbol + ' win the game!';
}
function noWinner() {
  document.getElementById('winner-id').innerHTML = 'No winner, start a new game';
}

function onItemClick(rowIndex, columnIndex) {
  data[rowIndex][columnIndex] = currentSymbol;
  Timer();
  calculateWinner();
  toggleSymbol();
}

function createBoard() {
    data = [];
    for (let i = 0; i < complexity; i++) {
      data[i] = [];
      const row = document.createElement('div');
      row.classList.add('row');
      board.appendChild(row);

      for (let j = 0; j < complexity; j++) {
        const column = document.createElement('div');
        column.classList.add('item');
        row.appendChild(column);
        data[i][j] = '';
      }
    }
  }

function calculateWinner() {
  let count = 1;
  let countcells = 0;             //setting values


  for (let rowIndex = 0; rowIndex < complexity; rowIndex++) {             //runing on columns's data//
    for (let columnIndex = 0; columnIndex < complexity - 1; columnIndex++) {
      if (data[rowIndex][0] !== '' && data[rowIndex][columnIndex] === data[rowIndex][columnIndex + 1])
        count++;
    }
    if (count == complexity) {                                     //check if there is a winner in the same column//
      clearInterval();
      setWinner();
      togglesPopup();
      resetGame();
      count = 1;                                                     //back to start count's value for a new game//
      return;
    }                                                    // out from the loop// 
    else count = 1;
  }                                           //if there is no winner yet, start a new count//



  for (let columnIndex = 0; columnIndex < complexity; columnIndex++) {      //runing on rows's data//
    for (let rowIndex = 0; rowIndex < complexity - 1; rowIndex++) {
      if (data[0][columnIndex] !== '' && data[rowIndex][columnIndex] === data[rowIndex + 1][columnIndex])
        count++;
    }
    if (count == complexity) {  //check if there is a winner in the same row//
      clearInterval();
      setWinner();
      togglesPopup();
      resetGame();
      count = 1;                                                        //back to start count's value for a new game//
      return;
    }                                                       // out from the loop// 
    else count = 1;
  }                                              //if there is no winner yet, start a new count//


  for (let rowIndex = 0; rowIndex < complexity - 1; rowIndex++) {
    if (data[0][0] !== '' && data[rowIndex][rowIndex] === data[rowIndex + 1][rowIndex + 1])
      count++;
  }
  if (count == complexity) {
    clearInterval();
    setWinner();
    togglesPopup();
    resetGame();
    count = 1;
    return;
  }
  else count = 1;


  let columnIndex = 0;
  for (let rowIndex = complexity - 1; rowIndex > 0; rowIndex--) {
    if (data[complexity - 1][0] !== '' && data[rowIndex][columnIndex] === data[rowIndex - 1][columnIndex + 1])
      count++;
    columnIndex++;
  }

  if (count == complexity) {
    clearInterval();
    setWinner();
    togglesPopup();
    resetGame();
    count = 1;
    return;
  }
  else count = 1;

  for (let rowIndex = 0; rowIndex < complexity; rowIndex++) {
    for (let columnIndex = 0; columnIndex < complexity; columnIndex++) {
      if (data[rowIndex][columnIndex] !== '')
        countcells++;
    }
  }

  if (countcells == complexity * complexity) {
    clearInterval();
    noWinner();
    togglesPopup();
    resetGame();
  }

}

function main() {
  const board = document.querySelector('#board');

  createBoard();
  bindClicks();

document.querySelector('#game-complexity').addEventListener('change', (event) => {

  complexity = event.target.value;
  resetGame();
})
}
main();