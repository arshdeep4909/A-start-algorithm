let cols = 5;
let rows = 5;
let grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;

function Spot(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  // f, g & h refers to f(n) = g(n) + h(n)
  // so we draw a rectnage when the cell is shown
  this.show = function (col) {
    fill(col);
    rect(this.x * w, this.y * h, w, h);
  };
}

// we have to improt it here other wise we will get an error
//when we use createCanvas, this is the second time we import
//but for genuine reason, otherwise we get an error in console
new p5();

function setup() {
  createCanvas(400, 400);

  w = width / cols;
  h = height / rows;

  console.log("A*");

  // the widht and height is extracted from
  // the create canvas property defined above

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  //converts each cell into a spot , which is an object
  //that has different attributes
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  //finding the path from top left to the bottom left of the screen
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  // we start our alorithm at the start point
  openSet.push(start);

  console.log(grid);
}

//alogrithm is basically a loop that keep running unless
//the openset is empty or we reach the destination
function draw() {
  if (openSet.length > 0) {
    // assuming that winner(the first element in OpenSet)
    // has the lowest f this
    // becomes our starting point then
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
  } else {
    //no solution
  }
  // function for each spot to show itself
  //hence we see the grid
  for (let i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show(color(255));
    }
  }
  //closed set will be red in color
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }
  //open set will be green in color
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }
}

setup();
