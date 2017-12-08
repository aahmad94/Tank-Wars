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

const Projectile = require("./projectile");
const Tank = require("./tank");
const Util = require("./util");

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
