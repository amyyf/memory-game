let container = document.getElementById('container');
container.addEventListener('click', function (event) {
  let card = event.target;
  if (card.classList.contains('flip')) {
    return;
  }
  card.classList.toggle('flip');
});
