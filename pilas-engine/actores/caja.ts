class Caja extends Actor {
  iniciar() {
    this.game.physics.p2.enable([this], true);
    this.body.static = true;
  }

  update() {}
}