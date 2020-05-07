class BallSpeedBonus extends AbstractBonus {
  constructor (hero, obj) {
    super(hero, obj);
    this.speed = Math.random() < 0.5 ? asafonov.settings.ballSpeed * 3/4 : asafonov.settings.ballSpeed * 1.5;
  }

  getMessage() {
    return "Ball's speed has changed";
  }

  apply() {
    this.obj.speed = this.speed;
    super.apply();
  }

  reverse() {
    this.obj.speed = asafonov.settings.ballSpeed;
  }
}
