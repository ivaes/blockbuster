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

MessageBus.prototype.unsubscribe = function (type, object, func) {
  for (var i = 0; i < this.subscribers[type].length; ++i) {
    if (this.subscribers[type][i].object === object && this.subscribers[type][i].func === func) {
      this.subscribers[type].slice(i, 1);
      break;
    }
  }
}

MessageBus.prototype.unsubsribeType = function (type) {
  delete this.subscribers[type];
}

MessageBus.prototype.destroy = function() {
  for (type in this.subscribers) {
    this.unsubsribeType(type);
  }

  this.subscribers = null;
}
