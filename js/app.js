let container = document.getElementById('container');
let siblings = container.children;
let flipped = [];

// early returns click event function after 2 clicks on different cards
let clicks = 0;
let maxClicks = 2;

container.addEventListener('click', function (event) {
  if (clicks >= maxClicks) {
    return;
  }
  let card = event.target;
  if (card.classList.contains('flip')) {
    return; // disables flipped card from being clicked again
  }
  card.classList.toggle('flip');
  clicks++;
  console.log(clicks);
  flipped.push(card); // gives me access to flipped cards to check if they match
  let card1 = flipped[0];
  let card2 = flipped[1];
  if (flipped.length <= 2) {
    card1.className === card2.className ? cardsMatch(card1, card2) : noMatch(card1, card2);
  } else {
    noMatch(card1, card2);
  }
  flipped = []; // resets data structure to allow play to continue
  console.log(flipped);
});

function cardsMatch (card1, card2) {
  card1.classList.toggle('matched');
  card2.classList.toggle('matched');
  clicks = 0;
}

function noMatch (card1, card2) {
  card1.classList.toggle('flip');
  card2.classList.toggle('flip');
  flipped = [];
  clicks = 0;
}
