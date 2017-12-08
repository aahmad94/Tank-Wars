/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);

class Projectile extends MovingObject {
  constructor(options) {
    options.radius = Projectile.RADIUS;
    super(options);
    this.isWrappable = false;
  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;
        this.vel[1] += 2;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Projectile.RADIUS = 5;
Projectile.SPEED = 15;

module.exports = Projectile;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
  }

  collideWith(otherObject) {
    // default do nothing
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);
const GameView = __webpack_require__(6);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// var canvas, ctx;
// window.onload = function () {
//   canvas = document.getElementById('gameCanvas');
//   ctx = canvas.getContext('2d');
//   ctx.fillStyle = 'black';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//
  // let img = new Image();
  // img.src = 'https://raw.githubusercontent.com/aahmad94/Tank-Wars/master/docs/images/ground.png';
  // img.onload = function(){
  // // create pattern
  //   let pattern = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
  //   ctx.fillStyle = pattern;
  //   ctx.fillRect(0, (canvas.height - 90), canvas.width, (canvas.height)); // ctx.fillRect(x, y, width, height);
  // };
// };

const Projectile = __webpack_require__(1);
const Tank = __webpack_require__(5);
const Util = __webpack_require__(0);

class Game {
  constructor() {
    this.projectiles = [];
    this.tanks = [];
  }

  add(object) {
    if (object instanceof Projectile) {
      this.projectiles.push(object);
    } else if (object instanceof Tank) {
      this.tanks.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addTank() {
    let tank;
    if (this.tanks.length === 0) {
      tank = new Tank({
        pos:[100, 500],
        game: this
      });
    } else {
      tank = new Tank({
        pos: [900, 500],
        game: this
      });
    }

    this.add(tank);
    console.log(this.tanks);

    return tank;
  }

  allObjects() {
    return [].concat(this.tanks, this.projectiles);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx) {

    // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, (Game.DIM_Y - 90));

    let img = new Image();
    img.src = 'https://raw.githubusercontent.com/aahmad94/Tank-Wars/master/docs/images/ground.png';
    img.onload = function(){
      // create pattern
      let pattern = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
      ctx.fillStyle = pattern;
      ctx.fillRect(0, (Game.DIM_Y - 90), Game.DIM_X, (Game.DIM_Y));
    };

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }


  // fix hardcoded position for 2 tanks
  // randomPosition() {
  //   return [
  //     90,
  //     (Game.DIM_Y - 90)
  //   ];
  // }

  remove(object) {
    if (object instanceof Projectile) {
      this.projectiles.splice(this.projectiles.indexOf(object), 1);
    } else if (object instanceof Tank) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

Game.BG_COLOR = "#42a1f4";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;

module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Projectile = __webpack_require__(1);
const Util = __webpack_require__(0);

function randomColor() {
  // const hexDigits = "0123456789ABCDEF";

  let color = "#f44245";
  // for (let i = 0; i < 3; i++) {
  //   color += hexDigits[Math.floor((Math.random() * 16))];
  // }

  return color;
}

class Tank extends MovingObject {
  constructor(options) {
    options.radius = Tank.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    super(options);
    this.bulletVel = [
      20, 20
    ];
  }

  fireBullet() {
    const norm = Util.norm(this.vel);

    // if (norm === 0) {
    //   // Can't fire unless moving.
    //   return;
    // }

    const relVel = Util.scale(
      Util.dir(this.vel),
      Projectile.SPEED
    );

    const bulletVel = this.bulletVel;

    const bullet = new Projectile({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  }

  power(impulse) {
    this.bulletVel[0] += impulse[0];
    this.bulletVel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

Tank.RADIUS = 20;
module.exports = Tank;


/***/ }),
/* 6 */
/***/ (function(module, exports) {


class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.tank1 = this.game.addTank();
    this.tank2 = this.game.addTank();
    this.tank = this.tank1;
  }

  bindKeyHandlers() {
    const tank = this.tank;

    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => { tank.power(move); });
    });

    key("space", () => { tank.fireBullet(); });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0]
};

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map