const MovingObject = require("./moving_object");
const Projectile = require("./projectile");
const Util = require("./util");

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
