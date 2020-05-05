var Levels = function (field) {
  this.levels = [];
  this.init(field);
}

Levels.prototype.init = function (field) {
  var objectMap = [];
  var iwidth = field.width / 2;
  var iheight = parseInt(field.height / 2);

  for (var i = 0; i < iheight; ++i) {
    for (var j = 0; j < field.width; ++j) {
      objectMap.push(j < field.width / 2 - iwidth / 2 || j >= field.width / 2 - iwidth / 2 + iwidth ? 0 : i % 2 + 1);
    }

    iwidth -= 2;
  }

  this.levels.push(objectMap);
}

Levels.prototype.getRandom = function() {
  return this.levels[parseInt(Math.random() * this.levels.length, 10)];
}
