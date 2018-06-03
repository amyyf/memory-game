let container = document.getElementById('container');
let siblings = container.children;
let flipped = [];

// early returns click event function after 2 clicks on different cards
// TODO: reset click event function so user can keep playing after 2 clicks
let clicks = 0;
let maxClicks = 2;

container.addEventListener('click', function (event) {
  if (clicks > maxClicks) {
    return; // TODO: need to reset click counter but change rules later on in function to enable continued gameplay
  }
  let card = event.target;
  if (card.classList.contains('flip')) {
    return; // disables flipped card from being clicked again
  }
  card.classList.toggle('flip');
  clicks ++;
  console.log(clicks);
  flipped.push(card); // gives me access to flipped cards to check if they match
  if (flipped.length === 2) {
    flipped[0].className === flipped[1].className ? console.log('match') : console.log('try again');
  } else if (flipped.length > 2) {
    for (let j = 0; j < flipped.length; j++) {
      flipped[j].classList.toggle('flip'); // erases 'flip' class from cards
    }
    flipped = []; // resets data structure to allow play to continue - though currently click event won't work
  }
  console.log(flipped);
});
