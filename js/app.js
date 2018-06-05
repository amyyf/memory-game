let container = document.getElementById('container');
let siblings = container.children;
let flipped = [];
let totalRemaining = 4;

// only allow two clicks before checking/resetting game
let clicks = 0;
let maxClicks = 2;

// click event handler
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
function cardsMatch (card1, card2) {
  card1.classList.toggle('matched');
  card2.classList.toggle('matched');
}

function noMatch (card1, card2) {
  card1.classList.toggle('flip');
  card2.classList.toggle('flip');
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
