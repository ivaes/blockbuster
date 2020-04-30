class HeroWidthBonus extends AbstractBonus {
  constructor (hero, obj) {
    super(hero, obj);
    this.width = (Math.random() < 0.5 ? -2 : 2) + asafonov.settings.heroWidth;
  }

  getMessage() {
    return "";
  }

  apply() {
    this.hero.setWidth(this.width);
    super.apply();
  }

  reverse() {
    this.hero.setWidth(asafonov.settings.heroWidth);
  }
}
