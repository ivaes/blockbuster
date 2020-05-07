class HeroView {

  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'hero';
    this.hero = null;
    asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
    asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');
    asafonov.messageBus.subscribe(asafonov.events.HERO_WIDTH_CHANGED, this, 'onHeroWidthChanged');
  }

  setSize (width, height) {
    this.width = width || this.width;
    this.height = height || this.height;

    if (this.hero === null || this.hero === undefined) {
      return ;
    }

    this.updateWidth();
  }

  updateWidth() {
    this.element.style.width = this.hero.width * this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.backgroundSize = this.hero.width * this.width + 'px ' + this.height + 'px';
  }

  onHeroMoved (eventData) {
    var position = eventData.obj.position;
    this.element.style.marginLeft = (this.width * position.x) + 'px';
    this.element.style.marginTop = (this.height * position.y) + 'px';
  }

  onHeroAdded (eventData) {
    this.hero = eventData.field.getHero();
    this.setSize();
  }

  onHeroWidthChanged (eventData) {
    if (this.hero === eventData.obj) {
      this.updateWidth();
    }
  }
}
