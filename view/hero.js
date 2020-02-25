var HeroView = function() {
  this.element = document.createElement('div');
  this.element.id = 'hero';
  this.hero = null;
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');
}

HeroView.prototype.setSize = function (width, height) {
  this.width = width || this.width;
  this.height = height || this.height;

  if (this.hero === null || this.hero === undefined) {
    return ;
  }

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
  console.log('heroAdded!!');
  console.log(this.width);
  this.hero = eventData.field.getHero();
  this.setSize();
}
