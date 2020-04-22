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
  asafonov.messageBus.subscribe(asafonov.events.OBJECT_COLLISION, this, 'onObjectCollision');
  asafonov.messageBus.subscribe(asafonov.events.GAME_LOST, this, 'onGameLost');
  asafonov.messageBus.subscribe(asafonov.events.GAME_WON, this, 'onGameWon');
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

FieldView.prototype.onGameLost = function() {
  this.alert("You lost");
}

FieldView.prototype.onGameWon = function() {
  this.alert("You won");
}

FieldView.prototype.alert = function (msg, type) {
  alert(msg);
  this.destroy();
  window.location.reload();
}

FieldView.prototype.onObjectAdded = function (eventData) {
  if (eventData.type === null || eventData.type === undefined || eventData.type == 0) {
    return;
  }

  var element = document.createElement('div');
  element.style.marginTop = this.itemHeight * eventData.position.y + 'px';
  element.style.marginLeft = this.itemWidth * eventData.position.x + 'px';
  element.style.width = this.itemWidth + 'px';
  element.style.height = this.itemHeight + 'px';
  element.style.backgroundSize = this.itemWidth + 'px ' + this.itemHeight + 'px';
  element.className = 'object_' + eventData.type;
  element.id = 'object_' + eventData.index;
  this.element.appendChild(element);
}

FieldView.prototype.onObjectCollision = function (eventData) {
  var element = document.getElementById('object_' + eventData.index);
  element.className = 'object_' + eventData.type;

  if (! (eventData.type > 0)) {
    this.element.removeChild(element);
  }
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

FieldView.prototype.destroy = function() {
  asafonov.messageBus.unsubscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
  asafonov.messageBus.unsubscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onBallAdded');
  asafonov.messageBus.unsubscribe(asafonov.events.OBJECT_ADDED, this, 'onObjectAdded');
  asafonov.messageBus.unsubscribe(asafonov.events.OBJECT_COLLISION, this, 'onObjectCollision');
  asafonov.messageBus.unsubscribe(asafonov.events.GAME_LOST, this, 'onGameLost');
  asafonov.messageBus.unsubscribe(asafonov.events.GAME_WON, this, 'onGameWon');
  window.removeEventListener('keydown', this.onKeyDownProxy);
  window.removeEventListener('click', this.onClickProxy);
  window.removeEventListener('touchstart', this.onClickProxy);
}
