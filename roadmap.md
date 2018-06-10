## Stages of project:

1. HTML page elements    
    - [x] container for cards
    - [x] 16 cards // cards need two sides  so actually 32 cards (or ::after pseudo-element)
    - [x] timer (starts when player starts the game, stops when player wins)
    - [x] star rating (3 stars)
    - [x] reset button
    - [x] move counter
1. JavaScript functionality
    - [x] timer running
    - [x] card shuffling (start button)
    - [x] card flipping
    - [x] pair matching
        - cards should have same class, check if class matches
    - [x] pair not matching
    - [x] game win
    - [x] modal popping up on game win
        - displays data: congratulations, time took, and star rating
        - gives option to play again
    - [x] reset option (resets game board, timer, and star rating)
    - [x] star rating (begins at 3, drops to 2 after a set number of moves, drops to 1 after even more moves)


## Questions/Assumptions:
- [x] how to randomly distribute cards on game start?
    - [x] use Math.random() to assign an id from 1-16 to each element? -> to assign a flex position?
     https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
- start button for initial shuffle?
- [x] how to keep container from flipping
- [ ] add dependencies and sources to README

## Fixes
- [x] second star being lost is incorrect - the first child is the one with the class 'lost' being added
- [x] win function no longer working!!
- [ ] reset button buggy if clicked while cards are transitioning - set delay?

**The cards always exist - what changes is the order (via JS) or the styling (via JS events and CSS styles)**
