var FieldView = function() {
  this.width;
  this.height;
  this.itemWidth;
  this.itemHeight;
  this.field;
  this.heroMoveInterval;
  this.onKeyDownProxy = this.onKeyDown.bind(this);
  this.onClickProxy = this.onClick.bind(this);
}

FieldView.prototype.init = function() {
  this.addEventListeners();
  this.initView();
}

FieldView.prototype.addEventListeners = function() {
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onBallAdded');
  asafonov.messageBus.subscribe(asafonov.events.OBJECT_ADDED, this, 'onObjectAdded');
  window.addEventListener('keydown', this.onKeyDownProxy);
  window.addEventListener('click', this.onClickProxy);
  window.addEventListener('touchstart', this.onClickProxy);
}

FieldView.prototype.initView = function() {
  this.element = document.getElementById('field');
  this.heroView = new HeroView();
  this.ballView = new BallView();
  this.initSize();
}

FieldView.prototype.initSize = function() {
  this.width = document.documentElement.offsetWidth;
  this.height = document.documentElement.offsetHeight;
  this.itemWidth = this.width / this.field.width;
  this.itemHeight = this.height / this.field.height;
  this.heroView.setSize(this.itemWidth, this.itemHeight);
  this.ballView.setSize(this.itemWidth, this.itemHeight);
}

FieldView.prototype.onObjectAdded = function (eventData) {
  var element = document.createElement('div');
  element.style.marginTop = this.itemHeight * eventData.position.y + 'px';
  element.style.marginLeft = this.itemWidth * eventData.position.x + 'px';
  element.style.width = this.itemWidth + 'px';
  element.style.height = this.itemHeight + 'px';
  element.style.backgroundSize = this.itemWidth + 'px ' + this.itemHeight + 'px';
  element.className = eventData.type;
  this.element.appendChild(element);
}

FieldView.prototype.onHeroAdded = function (eventData) {
  this.element.appendChild(this.heroView.element);
}

FieldView.prototype.onBallAdded = function (eventData) {
  this.element.appendChild(this.ballView.element);
}

FieldView.prototype.onKeyDown = function (e) {
  if (e.keyCode == 37) {
    this.startHeroMoving('moveLeft');
  } else if (e.keyCode == 39) {
    this.startHeroMoving('moveRight');
  }
}

FieldView.prototype.onClick = function (e) {
  if (e.clientX < document.documentElement.offsetWidth / 2) {
    this.startHeroMoving('moveLeft');
  } else {
    this.startHeroMoving('moveRight');
  }
}

FieldView.prototype.startHeroMoving = function (direction) {
  if (this.heroMoveInterval) {
    clearInterval(this.heroMoveInterval);
  }

  var hero = this.field.getHero();
  this.heroMoveInterval = setInterval(function() {hero[direction]();}, 60);
}
