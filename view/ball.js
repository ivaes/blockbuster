var BallView = function() {
  this.element = document.createElement('div');
  this.element.id = 'ball';
  asafonov.messageBus.subscribe(asafonov.events.BALL_MOVED, this, 'onBallMoved');
}

BallView.prototype.setSize = function (width, height) {
  this.width = width || this.width;
  this.height = height || this.height;
  this.element.style.width = this.width + 'px';
  this.element.style.height = this.height + 'px';
  this.element.style.backgroundSize = this.width + 'px ' + this.height + 'px';
}

BallView.prototype.onBallMoved = function (eventData) {
  console.log(eventData);
  var position = eventData.obj.position;
  this.element.style.marginLeft = (this.width * position.x) + 'px';
  this.element.style.marginTop = (this.height * position.y) + 'px';
}
