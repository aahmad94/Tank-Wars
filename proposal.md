## Tank Wars
### Background and Overview

Tank Wars is an artillery game developed in 1990 written for DOS.

At the game's start, players spawn in random order, evenly spaced horizontally on terrain/screen. with 100 health The players then take turns firing at the opponent; firing consists of adjusting angle and power settings, in addition, the tank may adjust it's horizontal position a fixed amount during each turn.

Ballistics are affected by environmental conditions such as gravity and wind which may change in both magnitude and direction during a match.

### Functionality and MVPs

In this two player variant of Tank Wars, each player will have three lives which they may lose if they're hit by a projectile. Per turn the player will be able to move horizontally up to 1/5th of the terrain's length, aim from between 40 and 140 degrees, and adjust the force of the shot, taking into account wind speed and direction.


 * Two tanks will spawn on flat terrain.
 * Each player will have three lives, which they may lose if they're hit by a projectile.
 * Per turn, each player will be able to:
     * move horizontally up to 1/5th of the terrain's length
     * aim from between 40 and 140 degrees
     * adjust the force of the shot
 * Wind will affect the horizontal acceleration component vector, otherwise at 0 m/(s * s)
 * Sound will be generated upon both firing and impact


 ## Architecture and Technologies

 This project will require handling of the projectile physics with vanilla Javascript via firing angle, velocity components (x, y), gravity, and wind resistance in the x-direction.

 HTML5 Canvas will be incorporated for DOM manipulation and rendering.

 Webpack will be used to bundle script files

 The script files needed for this project include:

 * `board.js`: handle logic for creating and updating DOM elements
 * `tank.js`: handle logic for tank movement
 * `gun.js`: handle logic for gun rotation and shot force
 * `projectile.js`: handle logic for projectile motion, whether the enemy was hit/deduct life
 * `player.js`:
 * `game.js`: handles logic for game start, alternating players turns, wind conditions, and game end  
 * `index.js`: instantiates Game class


 ### Implementation Timeline
**Day 1**: Review HTML5/Canvas documentation, find seamless image for environment, create Board and Tank classes; implement rendering of environment (seamless tile image for ground).

- [ ] Review Canvas
- [x] Find environment seamless image
- [ ] Create Board class, render environment
- [ ] Create Tank class

**Day 2**: Create Gun and Projectile classes take into account implementation of wind speed that will be determined in the Game class as well as number of lives available (Player class).

- [ ] create Gun class
- [ ] Create Projectile class

**Day 3**: Create Player class, implement controls for player interaction, integrate instructions into index.html

- [ ] Create Player class
- [ ] Implement controls (arrow keys/space bar)

**Day 4**: Create Game class, ensure game play is flawless, style via Canvas

- [ ] Create Game class
- [ ] Style game via Canvas

**Day 5** Debug and prepare for project submission (hosted properly)
