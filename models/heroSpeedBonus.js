class HeroSpeedBonus extends AbstractBonus {
  constructor (hero, obj) {
    super(hero, obj);
    this.speed = Math.random() < 0.5 ? 0.5 : 1.5;
  }

  getMessage() {
    return "Your speed has changed";
  }

  apply() {
    this.hero.speed = this.speed;
    super.apply();
  }

  reverse() {
    this.hero.speed = 1;
  }
}
