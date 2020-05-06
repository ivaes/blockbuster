class Levels {
  constructor (field) {
    this.levels = [];
    this.init(field);
  }

  init (field) {
    let objectMap = [];
    let iwidth = field.width / 2;
    let iheight = parseInt(field.height / 2);

    for (let i = 0; i < iheight; ++i) {
      for (let j = 0; j < field.width; ++j) {
        objectMap.push(j < field.width / 2 - iwidth / 2 || j >= field.width / 2 - iwidth / 2 + iwidth ? 0 : i % 2 + 1);
      }

      iwidth -= 2;
    }

    this.levels.push(objectMap);

    iwidth = field.width / 2;
    iheight = parseInt(field.height / 3);
    objectMap = [];

    for (let i = 0; i < iheight; ++i) {
      for (let j = 0; j < field.width; ++j) {
        objectMap.push(j < field.width / 2 - iwidth / 2 || j >= field.width / 2 - iwidth / 2 + iwidth ? i % 2 + 1 : 0);
      }

      iwidth -= 2;
    }

    this.levels.push(objectMap);

    objectMap = [];

    for (let i = 0; i < iheight; ++i) {
      for (let j = 0; j < field.width; ++j) {
        objectMap.push(j % 4 == 0 ? 1 : 0);
      }
    }

    this.levels.push(objectMap);

    objectMap = [];

    for (let i = 0; i < iheight; ++i) {
      for (let j = 0; j < field.width; ++j) {
        objectMap.push(parseInt(j / 4) % 2 == 0 ? 2 : 0);
      }
    }

    this.levels.push(objectMap);

    objectMap = [];

    for (let i = 0; i < iheight; ++i) {
      for (let j = 0; j < field.width; ++j) {
        objectMap.push(j % 4 == 0 ? 2 : 0);
      }
    }

    this.levels.push(objectMap);

    objectMap = [];

    for (let i = 0; i < iheight; ++i) {
      for (let j = 0; j < field.width; ++j) {
        objectMap.push(parseInt(j / 4) % 2 == 0 ? 1 : 0);
      }
    }

    this.levels.push(objectMap);
  }

  getRandom() {
    return this.levels[parseInt(Math.random() * this.levels.length, 10)];
  }
}
