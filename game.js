
var Field = function() {
  this.width = 40;
  this.height = 30;
  var _objects = [];
  var _hero = null;
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_MOVED, this, 'onHeroMoved');

  this.setHero = function (hero) {
    _hero = hero;
    _hero.moveTo(this.width / 2 - (_hero.width + 1) / 2, this.height - 1);
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
    if (obj.position.x < 0 || obj.position.x + obj.width > this.width) {
      obj.moveTo(fromPosition.x, fromPosition.y);
    }
  }
}
var Subject = function() {
  this.position = new Point(0, 0);
  this.width = 5;
}

Subject.prototype.moveLeft = function() {
  this.move(new Point(-1 ,0));
}

Subject.prototype.moveRight = function() {
  this.move(new Point(1, 0));
}

Subject.prototype.moveUp = function() {
  this.move(new Point(0, -1));
}

Subject.prototype.moveDown = function() {
  this.move(new Point(0, 1));
}

Subject.prototype.move = function (delta) {
  this.moveTo(this.position.x + delta.x, this.position.y + delta.y);
}

Subject.prototype.moveTo = function (x, y) {
  var position = new Point(this.position.x, this.position.y);
  this.position.x = x;
  this.position.y = y;
  asafonov.messageBus.send(asafonov.events.FIELD_HERO_MOVED, {obj: this, fromPosition: position});
}
var MessageBus = function() {
  this.subscribers = {};
}

MessageBus.prototype.send = function (type, data) {
  if (this.subscribers[type] !== null && this.subscribers[type] !== undefined) {
    for (var i = 0; i < this.subscribers[type].length; ++i) {
      this.subscribers[type][i]['object'][this.subscribers[type][i]['func']](data);
    }
  }
}

MessageBus.prototype.subscribe = function (type, object, func) {
  if (this.subscribers[type] === null || this.subscribers[type] === undefined) {
    this.subscribers[type] = [];
  }

  this.subscribers[type].push({
    object: object,
    func: func
  });
}

MessageBus.prototype.destroy = function() {
  this.subscribers = null;
}
var Point = function (x, y) {
  this.x = x || 0;
  this.y = y || 0;
}
var FieldView = function() {
  this.width;
  this.height;
  this.itemWidth;
  this.itemHeight;
  this.field;
  this.onKeyDownProxy = this.onKeyDown.bind(this);
  this.onClickProxy = this.onClick.bind(this);
}

FieldView.prototype.init = function() {
  this.addEventListeners();
  this.initView();
}

FieldView.prototype.addEventListeners = function() {
  asafonov.messageBus.subscribe(asafonov.events.FIELD_HERO_ADDED, this, 'onHeroAdded');
  asafonov.messageBus.subscribe(asafonov.events.OBJECT_ADDED, this, 'onObjectAdded');
  window.addEventListener('keydown', this.onKeyDownProxy);
  window.addEventListener('click', this.onClickProxy);
  window.addEventListener('touchstart', this.onClickProxy);
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

FieldView.prototype.onKeyDown = function (e) {
  if (e.keyCode == 37) {
    this.field.getHero().moveLeft();
  } else if (e.keyCode == 39) {
    this.field.getHero().moveRight();
  }
}

FieldView.prototype.onClick = function (e) {
  if (e.clientY < document.documentElement.offsetHeight / 4) {
    this.field.getHero().moveUp();
  } else if (e.clientY > document.documentElement.offsetHeight * 3 / 4) {
    this.field.getHero().moveDown();
  } else if (e.clientX < document.documentElement.offsetWidth / 4) {
    this.field.getHero().moveLeft();
  } else if (e.clientX > document.documentElement.offsetWidth * 3 / 4) {
    this.field.getHero().moveRight();
  }
}
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
window.asafonov = {};
window.asafonov.messageBus = new MessageBus();
window.asafonov.events = {
  FIELD_HERO_ADDED: 'fieldHeroAdded',
  FIELD_HERO_MOVED: 'fieldHeroMoved',
  OBJECT_ADDED: 'objectAdded'
};
document.addEventListener("DOMContentLoaded", function(event) { 
  var view = new FieldView();
  view.field = new Field();
  view.init();
  view.field.setHero(new Subject());
  var objectMap = [null];
});
