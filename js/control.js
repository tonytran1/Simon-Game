let currentPattern = [];
let myTurn = false;
const simon = new Simon();

$('#start-button').on('click', event => {
  startGame();
  $('#start-button').hide("slide", { direction: "left" }, 500);
  $('#status')[0].style.border = "5px solid green";
});

$('.simon-button').on('click', function(event) {
  if (!myTurn) { return; }
  let color = $(this).data('color');
  verifyColor(color);
});

function verifyColor(color) {
  if (color === currentPattern.shift()) {
    sounds[color].play();
    $(`.${ color }`).css('background-color', '#ffffff');
    setTimeout(() => {
      $(`.${ color }`).css('background-color', colorCodes[color]);
    }, 250);
    if (!currentPattern.length) {
      startGame();
    }
  } else {
    errorSound();
    playPattern();
  }
}

function errorSound() {
  let delay = 250;
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      sounds['green'].play();
    }, delay);
    delay += 250;
  }
}

function startGame() {
  simon.addToPattern();
  playPattern();
}

function playPattern() {
  $('#count > p').html(simon.pattern.length);
  currentPattern = simon.pattern.slice();
  myTurn = false;
  let index = 0;
  let playInterval = setInterval(() => {
    sounds[simon.pattern[index]].play();
    $(`.${ simon.pattern[index] }`).css('background-color', '#ffffff');
    setTimeout(() => {
      $(`.${ simon.pattern[index] }`).css('background-color', colorCodes[simon.pattern[index]]);
      if (index === simon.pattern.length - 1) {
        myTurn = true;
        clearInterval(playInterval);
      }
      index++;
    }, 500);
  }, 1000);
}

const sounds = {
  'green' : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  'red' : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  'yellow' : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  'blue' : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

const colorCodes = {
  'green' : '#009900',
  'red' : '#ff0000',
  'yellow' : '#ffff00',
  'blue' : '#1a1aff'
}
