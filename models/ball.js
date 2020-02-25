var Ball = function() {
  this.position = new Point(0, 0);
  this.direction = Ball.DIRECTION_UPRIGHT;
  this.angle = 1;
  setInterval(this.move.bind(this), 100);
}

Ball.DIRECTION_UPRIGHT = 1;
Ball.DIRECTION_UPLEFT = 2;
Ball.DIRECTION_DOWNRIGHT = 3;
Ball.DIRECTION_DOWNLEFT = 4;

Ball.HORIZONTAL_WALL = 1;
Ball.VERTICAL_WALL = 2;

Ball.prototype.moveByDelta = function (delta) {
  this.moveTo(this.position.x + delta.x, this.position.y + delta.y);
}

Ball.prototype.move = function() {
  var x = this.direction == Ball.DIRECTION_UPRIGHT || this.direction == Ball.DIRECTION_DOWNRIGHT ? 1 : -1;
  var y = this.direction == Ball.DIRECTION_UPRIGHT || this.direction == Ball.DIRECTION_UPLEFT ? -1 : 1;
  this.moveByDelta(new Point(x * this.angle, y));
}

Ball.prototype.moveTo = function (x, y) {
  var position = new Point(this.position.x, this.position.y);
  this.position.x = x;
  this.position.y = y;
  asafonov.messageBus.send(asafonov.events.BALL_MOVED, {obj: this, fromPosition: position});
}

Ball.prototype.changeDirection = function (wallType) {
  if (wallType == Ball.HORIZONTAL_WALL) {
    this.direction += this.direction % 2 == 1 ? 1 : -1;
  } else if (wallType == Ball.VERTICAL_WALL) {
    this.direction += this.direction < 3 ? 2 : -2;
  }
}
