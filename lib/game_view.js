
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
