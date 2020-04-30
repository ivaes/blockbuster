var HeroView = function() {
  this.element = document.createElement('div');
  this.element.id = 'hero';
  this.hero = null;
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');
  asafonov.messageBus.subscribe(asafonov.events.HERO_WIDTH_CHANGED, this, 'onHeroWidthChanged');
}

HeroView.prototype.setSize = function (width, height) {
  this.width = width || this.width;
  this.height = height || this.height;

  if (this.hero === null || this.hero === undefined) {
    return ;
  }

  this.updateWidth();
}

HeroView.prototype.updateWidth = function() {
  this.element.style.width = this.hero.width * this.width + 'px';
  this.element.style.height = this.height + 'px';
  this.element.style.backgroundSize = this.hero.width * this.width + 'px ' + this.height + 'px';
}

HeroView.prototype.onHeroMoved = function (eventData) {
  var position = eventData.obj.position;
  this.element.style.marginLeft = (this.width * position.x) + 'px';
  this.element.style.marginTop = (this.height * position.y) + 'px';
}

HeroView.prototype.onHeroAdded = function (eventData) {
  this.hero = eventData.field.getHero();
  this.setSize();
}

HeroView.prototype.onHeroWidthChanged = function (eventData) {
  if (this.hero === eventData.obj) {
    this.updateWidth();
  }
}
