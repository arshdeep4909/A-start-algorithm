function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if ((arr[i] = elt)) {
      arr.splice(i, 1);
    }
  }
}

let cols = 5;
let rows = 5;
let grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  // i & j are the cordinates taht we get form spot,
  // these define the location of the cells
  // f, g & h refers to f(n) = g(n) + h(n)
  // so we draw a rectnage when the cell is shown
  this.show = function (col) {
    fill(col);
    rect(this.i * w, this.j * h, w, h);
  };

  // adding neighbors to each spot
  this.addNeighbors = function (grid) {
    if (i < cols - 1) {
      // if this cell is on the edge then we can not select
      //the col after this one as it will be the end col
      this.neighbors.push(grid[this.i + 1][this.j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[this.i - 1][this.j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[this.i][this.j + 1]);
    }
    if (j > rows) {
      this.neighbors.push(grid[this.i][this.j - 1]);
    }
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
  //adding neighbors
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
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
    // if the winner is the last openSet then we are done testing
    //every possibiliyt hence the algo is fininshed
    let current = openSet[winner];
    if (current === end) {
      console.log("DONE!");
    }
    // defined removefromarray function right on top
    //of this file,
    // here once we found our winner we remove if from openset and
    //push it to closed set
    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      // the g (time) to get to neighbor should be be +1
      // since we are in a uniform gird
      neighbor.g = current.g + 1;

      if (!closedSet.includes(neighbor)) {
        let tempG = current.g + 1;
        // so if we have evaluated this beofer then I want
        // to see if this is a better gscore or not?
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }
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
