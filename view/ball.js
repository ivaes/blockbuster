var BallView = function() {
  this.element = document.createElement('div');
  this.element.id = 'ball';
  asafonov.messageBus.subscribe(asafonov.events.BALL_MOVED, this, 'onBallMoved');

  if (asafonov.settings.sfx) {
    this.ballChangedDirectionSound = new Audio('sound/ball.mp3');
    asafonov.messageBus.subscribe(asafonov.events.BALL_CHANGED_DIRECTION, this, 'onBallChangedDirection');
  }
}

BallView.prototype.setSize = function (width, height) {
  this.width = width || this.width;
  this.height = height || this.height;
  this.element.style.width = this.width + 'px';
  this.element.style.height = this.height + 'px';
}

BallView.prototype.onBallMoved = function (eventData) {
  var position = eventData.obj.position;
  this.element.style.marginLeft = (this.width * position.x) + 'px';
  this.element.style.marginTop = (this.height * position.y) + 'px';
}

BallView.prototype.onBallChangedDirection = function () {
  this.ballChangedDirectionSound.play();
}
