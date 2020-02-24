var Field = function() {
  this.width = 40;
  this.height = 30;
  var _objects = [];
  var _hero = null;
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');

  this.setHero = function (hero) {
    _hero = hero;
    _hero.moveTo(19, 29);
    asafonov.messageBus.send(asafonov.events.FIELD_HERO_ADDED, {field: this});
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
    _objects[this.positionToIndex(position)] = type;
    asafonov.messageBus.send(asafonov.events.OBJECT_ADDED, {type: type, position: position});
  }

  this.correctPosition = function (obj, fromPosition) {
    if (obj.position.x - (obj.width - 1) / 2 < 0 || obj.position.x + (obj.width - 1) / 2 > this.width - 1) {
      obj.moveTo(fromPosition.x, fromPosition.y);
    }
  }
}
