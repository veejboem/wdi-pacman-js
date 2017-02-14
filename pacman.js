// Setup initial game stats
var score = 0;
var lives = 2;
var p = 4;


// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
}

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
}

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
}

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
}

var ghosts = [ inky, blinky, pinky, clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('\n\nPower-Pellets: ' + p);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (inky.edible === true) {
    console.log('(1) Eat Inky (Edible)');
  }
  else {
    console.log('(1) Eat Inky (Inedible)');
  }
  if (blinky.edible === true) {
    console.log('(2) Eat Blinky (Edible)');
  }
  else {
    console.log('(2) Eat Blinky (Inedible)');
  }
  if (pinky.edible === true) {
    console.log('(3) Eat Pinky (Edible)');
  }
  else {
    console.log('(3) Eat Pinky (Inedible)');
  }
  if (clyde.edible === true) {
    console.log('(4) Eat Clyde (Edible)');
  }
  else {
    console.log('(4) Eat Clyde (Inedible)');
  }
  if (p > 0) {
    console.log('(p) Eat Power-Pellet')
  }
  else {
    console.log('\nThere are no more Power-Pellets!');
  };
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

//Eating an Inedible Ghost
function eatGhost(ghost) {
  if (!ghost.edible && lives > 0) {
    console.log('\nPacman just lost a life.');
    lives --;
    lifeCheck();
  } else {
    console.log('\nPacman just ate ' + ghost.name + 'whose character trait is ' + ghost.character);
    ghost.edible = false;
    score += 200;
    lifeCheck();
  }
}

// Check total lives
function lifeCheck() {
  if (lives === 0) {
  console.log('\nYou have run out of lives!');
  process.exit();
  }
}

//Power-Pellet ability
function eatPowerPellet() {
  if (p !=0) {
    score += 50;
    p --;
    ghosts.forEach(function(ghost) {
      ghost.edible = true;
      })
    } else {
      console.log('\nThere are no more Power-Pellets');
    }
}



// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'p':
      eatPowerPellet(p);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
