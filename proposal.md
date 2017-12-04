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

 Webpack will be used to bundle and execute the entry file.

 The script files needed for this project include:

 * `board.js`
 * `tank.js`
 * `gun.js`
 * `projectile.js`
 * `player.js`
 * `game.js`
 * `index.js`
