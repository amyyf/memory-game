const container = document.getElementById('container');
const cardCount = 16; // initializes desired number of cards
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const mins = document.getElementById('mins');
const secs = document.getElementById('secs');
const moveCounter = document.getElementById('move-counter');
const stars = document.getElementById('star-rating');
const modal = document.createDocumentFragment();
let pairsRemaining = cardCount / 2;
let cards;
let flipped = [];
let moves = moveCounter.textContent;

// start and reset functionality
let startTime;
let countTime;
startButton.addEventListener('click', startGame);

// only allow two clicks before checking/resetting game
let clicks = 0;
const maxClicks = 2;
container.addEventListener('click', function (event) {
  if (clicks >= maxClicks) {
    return;
  }
  let card = event.target;
  if (card.tagName !== 'DIV') {
    return; // disallows clicks not on cards
  }
  if (card.classList.contains('flipped')) {
    return; // disables flipped card from being clicked again
  }
  card.classList.toggle('flipped');
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

  // scoring/game-end logic
  if (pairsRemaining > 0) {
    return;
  } else {
    win();
  }

  // star rating
  const loseOne = (cardCount / 2) * 1.25;
  const loseTwo = (cardCount / 2) * 1.6;
  if (moves > loseOne && moves < loseTwo) {
    let starThree = stars.lastChild;
    starThree.classList.add('lost');
  } else if (moves > loseTwo) {
    let starTwo = stars.firstChild.nextSibling;
    starTwo.classList.add('lost');
  }
});

// function definitions
function startGame () {
  startTime = new Date();
  countTime = setInterval(count, 1000);
  dealCards();
  startButton.remove();
  resetButton.addEventListener('click', resetGame);
}

function count () {
  const elapsed = new Date();
  const startMs = startTime.valueOf();
  const elapsedMs = elapsed.valueOf();
  const diff = elapsedMs - startMs;
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

function resetGame () {
  clearInterval(countTime);
  secs.textContent = '00';
  mins.textContent = '00';
  startTime = new Date();
  countTime = setInterval(count, 1000);
  randomizeCards(cards);
  clicks = 0;
  flipped = [];
  pairsRemaining = cardCount / 2;
  moves = 0;
  moveCounter.textContent = moves;
  for (let card of cards) {
    if (card.classList.contains('matched')) {
      card.classList.remove('matched');
    }
    if (card.classList.contains('flipped')) {
      card.classList.remove('flipped');
    }
  }
  if (document.querySelector('dialog')) {
    document.querySelector('dialog').remove();
  }
}

function dealCards () {
  let cardList = document.createDocumentFragment();
  for (let x = 1; x <= cardCount; x++) {
    let card = document.createElement('div');
    card.classList.add('card');
    cardList.appendChild(card);
  }
  container.appendChild(cardList);
  cards = container.children;
  let j = 1;
  for (let i = 0; i < cards.length; i += 2) {
    let card = cards[i];
    card.classList.add('pair-' + [j]);
    card.nextSibling.classList.add('pair-' + [j]);
    j++;
  }
  randomizeCards(cards);
}

function randomizeCards (cardsList) {
  const newOrder = document.createDocumentFragment();
  for (let i = 0; i < cardsList.length; i++) {
    let randomNum = Math.floor(Math.random() * cardsList.length);
    let currentCard = cardsList[i];
    let randomCard = cardsList[randomNum];
    currentCard = randomCard;
    newOrder.appendChild(currentCard);
  }
  container.appendChild(newOrder);
}

function cardsMatch (card1, card2) {
  card1.classList.toggle('matched');
  card2.classList.toggle('matched');
  moves++;
  moveCounter.textContent = moves;
  pairsRemaining--;
}

function noMatch (card1, card2) {
  card1.classList.toggle('flipped');
  card2.classList.toggle('flipped');
  moves++;
  moveCounter.textContent = moves;
}

function win () {
  const dialog = document.createElement('dialog');
  dialog.textContent = 'Congratulations, you won! Would you like to play again?';
  modal.appendChild(dialog);
  const button = document.createElement('button');
  button.textContent = 'Play again';
  dialog.appendChild(button);
  button.addEventListener('click', resetGame);
  dialog.appendChild(stars);
  const totalMoves = document.createElement('span');
  totalMoves.textContent = moves;
  dialog.appendChild(totalMoves);
  const totalMins = document.createElement('span');
  const totalSecs = document.createElement('span');
  totalMins.textContent = mins.textContent;
  totalSecs.textContent = secs.textContent;
  dialog.appendChild(totalMins);
  dialog.appendChild(totalSecs);
  document.body.appendChild(modal);
  dialog.showModal();
  clearInterval(countTime);
  secs.textContent = '00';
  mins.textContent = '00';
}
