var FieldView = function() {
  this.width;
  this.height;
  this.itemWidth;
  this.itemHeight;
  this.field;
  this.element;
  this.alertElement;
  this.heroMoveInterval;
  this.onKeyDownProxy = this.onKeyDown.bind(this);
  this.onTouchProxy = this.onTouch.bind(this);
  this.hideAlertProxy = this.hideAlert.bind(this);
  this.objectCollisionSound = new Audio('sound/explosion.mp3');
  this.bonusSound = new Audio('sound/bonus.mp3');
}

FieldView.prototype.init = function() {
  this.addEventListeners();
  this.initView();
  this.initAlerts();
}

FieldView.prototype.addEventListeners = function() {
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onBallAdded');
  asafonov.messageBus.subscribe(asafonov.events.OBJECT_ADDED, this, 'onObjectAdded');
  asafonov.messageBus.subscribe(asafonov.events.OBJECT_COLLISION, this, 'onObjectCollision');
  asafonov.messageBus.subscribe(asafonov.events.GAME_LOST, this, 'onGameLost');
  asafonov.messageBus.subscribe(asafonov.events.GAME_WON, this, 'onGameWon');
  asafonov.messageBus.subscribe(asafonov.events.BONUS_APPLIED, this, 'onBonusApplied');
  window.addEventListener('keydown', this.onKeyDownProxy);
  window.addEventListener('touchstart', this.onTouchProxy);
}

FieldView.prototype.initView = function() {
  this.element = document.getElementById('field');
  this.heroView = new HeroView();
  this.initSize();
}

FieldView.prototype.initSize = function() {
  this.width = document.documentElement.offsetWidth;
  this.height = document.documentElement.offsetHeight;
  this.itemWidth = this.width / this.field.width;
  this.itemHeight = this.height / this.field.height;
  this.heroView.setSize(this.itemWidth, this.itemHeight);
}

FieldView.prototype.onGameLost = function() {
  document.querySelector('#gameover').style.display = 'block';
  document.querySelector('#gameover button').focus();
}

FieldView.prototype.onGameWon = function() {
  this.onGameLost();
}

FieldView.prototype.alert = function (msg) {
  this.alertElement.innerHTML = msg;
  this.alertElement.style.display = 'block';
  setTimeout(this.hideAlertProxy, 3000);
}

FieldView.prototype.hideAlert = function() {
  this.alertElement.style.display = 'none';
}

FieldView.prototype.initAlerts = function() {
  this.alertElement = document.createElement('div');
  this.alertElement.className = 'alert';
  document.body.appendChild(this.alertElement);
  this.hideAlert();
}

FieldView.prototype.onObjectAdded = function (eventData) {
  if (eventData.type === null || eventData.type === undefined || eventData.type == 0) {
    return;
  }

  var element = document.createElement('div');
  element.style.marginTop = this.itemHeight * eventData.position.y + 'px';
  element.style.marginLeft = this.itemWidth * eventData.position.x + 'px';
  element.style.width = (this.itemWidth - 2) + 'px';
  element.style.height = (this.itemHeight - 2) + 'px';
  element.style.backgroundSize = this.itemWidth + 'px ' + this.itemHeight + 'px';
  element.className = 'object object_' + eventData.type;
  element.id = 'object_' + eventData.index;
  this.element.appendChild(element);
}

FieldView.prototype.onObjectCollision = function (eventData) {
  var element = document.getElementById('object_' + eventData.index);
  element.className = 'object object_' + eventData.type;

  if (! (eventData.type > 0)) {
    asafonov.settings.sfx && this.objectCollisionSound.play();
    this.element.removeChild(element);
  }
}

FieldView.prototype.onHeroAdded = function (eventData) {
  this.element.appendChild(this.heroView.element);
}

FieldView.prototype.onBallAdded = function (eventData) {
  this.ballView = new BallView();
  this.ballView.setSize(this.itemWidth, this.itemHeight);
  this.element.appendChild(this.ballView.element);
}

FieldView.prototype.onBonusApplied = function (eventData) {
  this.alert(eventData.message);
  asafonov.settings.sfx && this.bonusSound.play();
}

FieldView.prototype.onKeyDown = function (e) {
  if (e.keyCode == 37) {
    this.startHeroMoving('moveLeft');
  } else if (e.keyCode == 39) {
    this.startHeroMoving('moveRight');
  }
}

FieldView.prototype.onTouch = function (e) {
  e.preventDefault();
  var x = e.touches[e.touches.length - 1].clientX;

  if (x < document.documentElement.offsetWidth / 2) {
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
  window.removeEventListener('touchstart', this.onTouchProxy);
}
