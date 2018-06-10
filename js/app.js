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
let cardCheckTimeout;
let flipped = [];
let moves = moveCounter.textContent;

// start and reset functionality
let startTime;
let timer = 0;
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
  if (flipped.length < 2) { // only checks cards when two are flipped
    return;
  }
  let card1 = flipped[0];
  let card2 = flipped[1];

  cardCheckTimeout = window.setTimeout(checkCards, 2000);
  function checkCards () {
    card1.className === card2.className ? cardsMatch(card1, card2) : noMatch(card1, card2);
    // resets data structure to allow play to continue
    flipped = [];
    clicks = 0;
    countStars();
    // scoring/game-end logic
    if (pairsRemaining > 0) {
      return;
    } else {
      win();
    }
  }
});

// function definitions
function startGame () {
  startTime = new Date();
  timer = setInterval(count, 1000);
  dealCards();
  randomizeCards(cards);
  startButton.remove();
  resetButton.className = 'button';
  resetButton.addEventListener('click', resetGame);
  win();
}

function count () {
  const elapsed = new Date(); // counts seconds
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
  clearTimeout(cardCheckTimeout);
  clearInterval(timer);
  secs.textContent = '00';
  mins.textContent = '00';
  startTime = new Date();
  timer = setInterval(count, 1000);
  // reset all variables to start new game
  clicks = 0;
  flipped = [];
  pairsRemaining = cardCount / 2;
  moves = 0;
  moveCounter.textContent = moves;
  let starThree = stars.lastChild;
  starThree.className = 'fas fa-star';
  let starTwo = stars.lastChild.previousSibling;
  starTwo.className = 'fas fa-star';
  // remove current cards and create new cards to avoid glitchy tranforms while randomizing
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
  if (document.querySelector('dialog')) {
    document.querySelector('dialog').remove();
  }
  dealCards();
  randomizeCards(cards);
}

function dealCards () {
  let cardList = document.createDocumentFragment();
  // creates cards with class 'card'
  for (let x = 1; x <= cardCount; x++) {
    let card = document.createElement('div');
    card.classList.add('card');
    cardList.appendChild(card);
  }
  container.appendChild(cardList);
  cards = container.children;
  // assigns pairs as class names
  let j = 1;
  for (let i = 0; i < cards.length; i += 2) {
    let card = cards[i];
    card.classList.add('pair-' + [j]);
    card.nextSibling.classList.add('pair-' + [j]);
    j++;
  }
}

function randomizeCards (cardsList) {
  const newOrder = document.createDocumentFragment();
  for (let i = 0; i < cardsList.length; i++) {
    let randomNum = Math.floor(Math.random() * cardsList.length);
    // reassigns first card to a random card and appends to new order
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
  moves++; // a correct match counts as a move
  moveCounter.textContent = moves;
  pairsRemaining--; // to count down to game end
}

function noMatch (card1, card2) {
  card1.classList.toggle('flipped');
  card2.classList.toggle('flipped');
  moves++; // an incorrect match also counts as a move
  moveCounter.textContent = moves;
}

function countStars () {
  // magic numbers calculate how many moves are allowed before a star is lost
  const loseOne = (cardCount / 2) * 1.25;
  const loseTwo = (cardCount / 2) * 2;
  if (moves > loseOne && moves < loseTwo) {
    let starThree = stars.lastChild;
    starThree.className = 'far fa-star';
  } else if (moves > loseTwo) {
    let starTwo = stars.lastChild.previousSibling;
    starTwo.className = 'far fa-star';
  }
}

function win () {
  createModal();
  const dialog = document.querySelector('dialog');
  dialog.showModal();
  const button = dialog.querySelector('button');
  button.addEventListener('click', resetGame);
  // stop timer after game ends
  clearInterval(timer);
  secs.textContent = '00';
  mins.textContent = '00';
}

function createModal () {
  const dialog = document.createElement('dialog');
  const widgetDiv = document.createElement('div');
  const button = document.createElement('button');
  const totalMoves = document.createElement('span');
  const totalSecs = document.createElement('span');
  const totalMins = document.createElement('span');
  dialog.textContent = 'Congratulations, you won! Would you like to play again?';
  dialog.classList.add('p-text');
  dialog.classList.add('modal');
  button.textContent = 'Play again';
  button.classList.add('button');
  button.classList.add('play-again-button');
  widgetDiv.classList.add('widgets');
  totalMoves.textContent = moves + ' moves';
  totalMins.textContent = mins.textContent + ' minutes';
  totalSecs.textContent = secs.textContent + ' seconds';
  modal.appendChild(dialog);
  dialog.appendChild(button);
  dialog.appendChild(widgetDiv);
  widgetDiv.appendChild(stars.cloneNode(true));
  widgetDiv.appendChild(totalMoves);
  widgetDiv.appendChild(totalMins);
  widgetDiv.appendChild(totalSecs);
  const first = document.body.firstChild;
  document.body.insertBefore(modal, first);
}
