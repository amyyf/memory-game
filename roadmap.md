## Stages of project:

1. HTML page elements    
    - [ ] container for cards
    - [ ] 16 cards // cards need two sides  so actually 32 cards (or ::after pseudo-element)
    - [ ] timer (starts when player starts the game, stops when player wins)
    - [ ] star rating (3 stars)
    - [ ] reset button
    - [ ] move counter
1. JavaScript functionality
    - [ ] timer running
    - [ ] card shuffling (start button)
    - [x] card flipping
    - [x] pair matching
        - cards should have same class, check if class matches
    - [x] pair not matching
    - [x] game win
    - [ ] modal popping up on game win
        - displays data: congratulations, time took, and star rating
        - gives option to play again
    - [ ] reset option (resets game board, timer, and star rating)
    - [ ] star rating (begins at 3, drops to 2 after a set number of moves, drops to 1 after even more moves)


## Questions/Assumptions:
- [ ] how to randomly distribute cards on game start?
    - [ ] use Math.random() to assign an id from 1-16 to each element? -> to assign a flex position?
     https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
- start button for initial shuffle?
- [x] how to keep container from flipping
- [ ] add dependencies and sources to README

**The cards always exist - what changes is the order (via JS) or the styling (via JS events and CSS styles)**
