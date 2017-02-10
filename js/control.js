const pattern = [];
const colors = ['green', 'red', 'yellow', 'blue'];
let currentPattern = [];
let myTurn = false;

$('#start-button').on('click', event => {
  startGame();
  $('#start-button').hide("slide", { direction: "left" }, 500);
});

$('.simon-button').on('click', function(event) {
  if (!myTurn) { return; }
  let color = $(this).data('color');
  verifyColor(color);

});

function verifyColor(color) {
  if (color === currentPattern.shift()) {
    sounds[color].play();
    $(`.${ color }`).css('background-color', '#262626');
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
  addToPattern();
  playPattern();
}

function addToPattern() {
  let color = colors[Math.floor(Math.random() * colors.length)];
  pattern.push(color);
  $('#count').html(pattern.length);
}

function playPattern() {
  let delay = 1000;
  currentPattern = pattern.slice();
  myTurn = false;
  disableButtons();
  pattern.forEach((color, index) => {
    setTimeout(() => {
      sounds[color].play();
      $(`.${ color }`).css('background-color', '#262626');
      setTimeout(() => {
        $(`.${ color }`).css('background-color', colorCodes[color]);
        if (index === pattern.length - 1) {
          myTurn = true;
        }
      }, (delay / 7));
    }, delay);
    delay += 1000;
  });
}

function disableButtons() {
  $('.simon-button').prop('disabled', true);
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
