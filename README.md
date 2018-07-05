# Building a web version of Concentration from scratch!

This is a web version of your typical memory card game, where the player clicks or taps cards to turn them over and reveal the image on the other side, with the goal of matching all pairs as quickly as possible.

### Why Concentration?

This is the second project for my Front-End Nanodegree through [Udacity](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001), for which I was awarded a merit scholarship by [Grow with Google](https://grow.google/). It's the first significant app I've built from scratch (yep, I chose to eschew the starter files!) combining my knowledge of HTML, CSS, and JavaScript.

Because I'm interested in architecture, I chose to have players match buildings from around the world (see image links below for a list of buildings).

### How the Game Works

The cards for gameplay are built in the DOM. Each time the game is started or reset, the cards are rebuilt and randomized. Matches are determined by comparing CSS classes (`pair-1`, `pair-2`, etc.) whenever two cards have been clicked. The app tracks clicks and moves, times gameplay, and calculates a "rating" based on how many moves a player takes to find all matches.

### Usage and Contribution Guidelines

The game has no dependencies. It does make use of [Font Awesome](https://fontawesome.com/) and [Google Fonts](https://fonts.google.com/), which it accesses through `stylesheet` links in the document head rather than making you download them.

If you encounter an error while using, I would be so thrilled to be notified!!

Please submit an issue if you find one and don't want to fix it yourself. If you do want to fix an issue yourself, or if you'd like to update a feature, please create your pull request on a new branch rather than on the master branch so I can easily merge it in.

I am not looking to implement new features at this point, but perhaps in the future. Nothing is ever finished, right?


### Image Credits

All photos sourced from [Pexels](https://www.pexels.com/) under the Creative Commons Zero (CCO) license and edited by me.

**Original Image Links**
* [Flatiron Building, NYC](https://www.pexels.com/photo/low-angle-photo-of-flatiron-building-1123982/)
* [Eiffel Tower, Paris](https://www.pexels.com/photo/ancient-architectural-architecture-black-604444/)
* [Opera House, Sydney](https://www.pexels.com/photo/australia-house-sydney-vivid-54610/)
* [Taipei 101](https://www.pexels.com/photo/photography-of-tower-889812/)
* [Leaning Tower of Pisa](https://www.pexels.com/photo/leaning-tower-of-pisa-italy-1144271/)
* [Big Ben (*Elizabeth Tower*), London](https://www.pexels.com/photo/london-night-lights-bridge-50632/)
* [Oriental Pearl Tower, Shanghai](https://www.pexels.com/photo/night-skyline-skyscrapers-shanghai-19885/)
* [Burj Al Arab, Dubai](https://www.pexels.com/photo/sea-beach-holiday-vacation-2352/)

### Other Sources of Help

A few pages I referenced while coding:
* https://ux.stackexchange.com/questions/91672/how-to-limit-mouse-clicks-in-javascript
* [CSS-Tricks](https://css-tricks.com), and especially [this article](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/) by Sara Soueidan
* [My own time-tracking project](https://codepen.io/amyyf/pen/GxajKb)
* [MDN, always and forever](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Auto-placement_in_CSS_Grid_Layout)


### License

This is a student project, but I did spend a lot of hours on it! Please feel free to use, but please let me know if you do so.
