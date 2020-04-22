var Field = function() {
  this.width = 40;
  this.height = 30;
  var _objects = [];
  var _hero = null;
  var _ball = null;
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');
  asafonov.messageBus.subscribe(asafonov.events.BALL_MOVED, this, 'onBallMoved');

  this.setHero = function (hero) {
    _hero = hero;
    _hero.moveTo(this.width / 2 - (_hero.width + 1) / 2, this.height - 1);
    asafonov.messageBus.send(asafonov.events.FIELD_HERO_ADDED, {field: this});
  }

  this.setBall = function (ball) {
    _ball = ball;
    _ball.moveTo(this.width / 2 - 1, this.height - 2);
    asafonov.messageBus.send(asafonov.BALL_ADDED, {field: this, ball: ball});
  }

  this.getHero = function() {
    return _hero;
  }

  this.getHeroPosition = function() {
    return _hero.position;
  }

  this.onHeroMoved = function (eventData) {
    this.correctPosition(eventData.obj, eventData.fromPosition);
  }

  this.onBallMoved = function (eventData) {
    this.correctBallPosition(eventData.obj, eventData.fromPosition);
  }

  this.positionToIndex = function (position) {
    return position.y * this.width + position.x;
  }

  this.indexToPosition = function (index) {
    return new Point(index % this.width, parseInt(index / this.width, 10));
  }

  this.setObjectMap = function (objects) {
    for (var i = 0; i < objects.length; ++i) {
      if (objects[i] !== null && objects[i] !== undefined) {
        this.addObject(objects[i], this.indexToPosition(i));
      }
    }
  }

  this.addObject = function (type, position) {
    var index = this.positionToIndex(position);
    _objects[index] = type;
    asafonov.messageBus.send(asafonov.events.OBJECT_ADDED, {type: type, position: position, index: index});
  }

  this.correctPosition = function (obj, fromPosition) {
    if (obj.position.x < 0 || obj.position.x + obj.width > this.width) {
      obj.moveTo(fromPosition.x, fromPosition.y);
    }
  }

  this.checkCollision = function (obj, fromPosition) {
    var i = this.positionToIndex(obj.position);

    if (_objects[i] !== null && _objects[i] !== undefined && _objects[i] > 0) {
      _objects[i]--;
      asafonov.messageBus.send(asafonov.events.OBJECT_COLLISION, {index: i, type: _objects[i]});
      obj.position = fromPosition;
      var downPositionIndex = this.positionToIndex({x: obj.position.x, y: obj.position.y + 1});
      obj.changeDirection(Ball[_objects[downPositionIndex] !== null && _objects[downPositionIndex] !== undefined && _objects[downPositionIndex] > 0 ? 'VERTICAL_WALL' : 'HORIZONTAL_WALL']);
      return true;
    }

    return false;
  }

  this.correctBallPosition = function (obj, fromPosition) {
    if (this.checkCollision(obj, fromPosition)) {
      return;
    }

    if (obj.position.y == this.height - 1 && obj.position.x >= _hero.position.x && obj.position.x <= _hero.position.x + _hero.width - 1) {
      if (_hero.position.x == obj.position.x && obj.direction == Ball.DIRECTION_DOWNRIGHT) {
        obj.angle = 2;
      } else if (obj.position.x - _hero.position.x == _hero.width - 1 && obj.direction == Ball.DIRECTION_DOWNLEFT) {
        obj.angle = 2;
      } else {
        obj.angle = 1;
      }

      var wallType = obj.angle == 2 ? Ball.CORNER_WALL : Ball.HORIZONTAL_WALL;

      if ((obj.position.x - _hero.position.x == 1 && obj.direction == Ball.DIRECTION_DOWNRIGHT) || (obj.position.x - _hero.position.x == _hero.width - 2 && obj.direction == Ball.DIRECTION_DOWNLEFT)) {
        wallType = Math.random() < 0.5 ? Ball.CORNER_WALL : wallType;
      }

      obj.changeDirection(wallType);
      obj.position = fromPosition;
      obj.move();
    } else if (obj.position.x < 0 || obj.position.x > this.width - 1) {
      obj.position = fromPosition;
      obj.changeDirection(Ball.VERTICAL_WALL);
      obj.move();
    } else if (obj.position.y < 0) {
      obj.position = fromPosition;
      obj.changeDirection(Ball.HORIZONTAL_WALL);
      obj.move();
    } else if (obj.position.y > this.height - 1) {
      obj.destroy();
    }
  }
}
