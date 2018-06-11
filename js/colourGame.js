var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("targetcolordisplay");
var messageDisplay = document.getElementById("messageDisplay");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");

init();

function init(){
  setupModeButtons();
  setupSquares();
  resetUI();
}


function setupSquares(){
  // square listeners
  for(var i = 0;i < squares.length;i++){
    // add click listeners to squares
    squares[i].addEventListener("click",function(){
      // grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      // compare color to picked color
      if(clickedColor === pickedColor){
        // if guessed color correctly
        messageDisplay.textContent = "Correct!";
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
        reset.textContent = "Play Again?";
      } else {
        // if guessed color incorrectly
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}


function setupModeButtons(){
  // mode button event listeners
  for(var i = 0;i < modeBtns.length;i++){
    modeBtns[i].addEventListener("click",function(){
      modeBtns[0].classList.remove("selected");
      modeBtns[1].classList.remove("selected");
      this.classList.add("selected");
      // figure out how many squares
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      // reset
      resetUI();
    });
  }
}


reset.addEventListener("click",function(){
  // reset button listener
  resetUI();
});


var body = document.querySelector("body");
body.addEventListener("keydown",function(e){
  var isInput = ~["TEXTAREA", "INPUT"].indexOf(e.target.tagName);
  if(e.key === " " && !isInput){
    resetUI();
  }
});


function resetUI(){
  // generate new colors
  colors = generateRandomColors(numSquares);
  // pick new random color from array and display as target
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  // reset h1 to blue
  h1.style.backgroundColor = "steelblue";
  //reset message display and reset button label
  reset.textContent = "New Colors"
  messageDisplay.textContent = "";
  // reload color blocks on ui
  for(var i = 0;i < squares.length;i++){
    // add color styling to squares/ make disappear
    // colors[i] ? squares[i].style.backgroundColor = colors[i]:squares[i].style.display = "none";
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}


function changeColors(color){
  // loop through all squares
  for(var i = 0; i < squares.length;i++){
    // change each color to match given color
    squares[i].style.backgroundColor = color;
  };
}


function pickColor(){
    // picks a value from the colors array at random to be the "correct" value
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}


function generateRandomColors(len){
  // make an array
  var arr = [];
  // add len random colors to array
  for(var i = 0;i < len;i++){
    // get random color and push into array
    arr.push(randomColor());
  };
  // return that array
  return arr;
}


function randomColor(){
  // pick a red from 0 to 255
  var r = Math.floor(Math.random() * 256);
  // pick a green from 0 to 255
  var g = Math.floor(Math.random() * 256);
  // pick a blue from 0 to 255
  var b = Math.floor(Math.random() * 256);
  // concatenate into rgb tag and return
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
