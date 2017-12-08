const MovingObject = require("./moving_object");

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
