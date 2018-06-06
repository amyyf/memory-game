let container = document.getElementById('container');
let siblings = container.children;
let flipped = [];
let totalRemaining = siblings.length;
let startButton = document.getElementById('start-button');
let resetButton = document.getElementById('reset-button');
// let timer = document.getElementById('timer');
let mins = document.getElementById('mins');
let secs = document.getElementById('secs');
let moveCounter = document.getElementById('move-counter');
let moves = moveCounter.textContent;

// start and reset functionality
startButton.addEventListener('click', function () {
  let startTime = new Date();
  let countTime = setInterval(count, 1000);
  let countAgain;
  startButton.remove();
  resetButton.addEventListener('click', function () {
    clearInterval(countTime);
    clearInterval(countAgain);
    startTime = new Date();
    countAgain = setInterval(count, 1000);
    siblings = randomizeCards(siblings); // TODO: not sure this works correctly, hard to tell with only four cards - .appendChild?
    clicks = 0;
    flipped = [];
    totalRemaining = siblings.length;
    moves = 0;
    moveCounter.textContent = moves;
  });
  function count () {
    console.log('calling function count');
    let elapsed = new Date();
    let startMs = startTime.valueOf();
    let elapsedMs = elapsed.valueOf();
    let diff = elapsedMs - startMs;
    let sec = Math.floor((diff / 1000) % 60);
    if (sec < 10) {
      sec = '0' + sec;
    }
    let min = Math.floor((((diff / 1000) - sec) / 60) % 60);
    if (min < 10) {
      min = '0' + min;
    }
    secs.textContent = sec;
    mins.textContent = min;
  }
  siblings = randomizeCards(siblings); // TODO: not sure this works correctly, hard to tell with only four cards - .appendChild?
});

// only allow two clicks before checking/resetting game
let clicks = 0;
let maxClicks = 2;
container.addEventListener('click', function (event) {
  if (clicks >= maxClicks) {
    return;
  }
  let card = event.target;
  if (card.tagName !== 'DIV') {
    return; // disallows clicks not on cards
  }
  if (card.classList.contains('flip')) {
    return; // disables flipped card from being clicked again
  }
  card.classList.toggle('flip');
  clicks++;
  flipped.push(card); // gives me access to flipped cards to check if they match
  let card1 = flipped[0];
  let card2 = flipped[1];

  if (flipped.length < 2) {
    return;
  }
  card1.className === card2.className ? cardsMatch(card1, card2) : noMatch(card1, card2);
  flipped = [];
  clicks = 0; // resets data structure to allow play to continue
  console.log(flipped);

  // scoring/game-end logic
  for (let sibling of siblings) {
    cardsLeft(sibling);
  }
});

// function definitions
function randomizeCards (cardsList) {
  for (let i = cardsList.length - 1; i >= 0; i--) {
    let currentCard = cardsList[i];
    let randomNum = Math.floor(Math.random() * (i + 1));
    cardsList[i] = cardsList[randomNum];
    cardsList[randomNum] = currentCard;
  } return cardsList;
}

function cardsMatch (card1, card2) {
  card1.classList.toggle('matched');
  card2.classList.toggle('matched');
  moves++;
  moveCounter.textContent = moves;
}

function noMatch (card1, card2) {
  card1.classList.toggle('flip');
  card2.classList.toggle('flip');
  moves++;
  moveCounter.textContent = moves;
}

function cardsLeft (sibling) {
  if (sibling.classList.contains('matched')) {
    totalRemaining--;
    console.log(totalRemaining);
  }
  if (totalRemaining === 0) {
    console.log('you win'); // TODO: what happens when you win - displayModal function
  }
}
