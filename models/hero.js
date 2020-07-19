class Subject {

  constructor() {
    this.position = new Point(0, 0);
    this.width = asafonov.settings.heroWidth;
    this.speed = 1;
  }

  moveLeft() {
    this.move(new Point(-1 * this.speed ,0));
  }

  moveRight() {
    this.move(new Point(1 * this.speed, 0));
  }

  moveUp() {
    this.move(new Point(0, -1 * this.speed));
  }

  moveDown() {
    this.move(new Point(0, 1 * this.speed));
  }

  move (delta) {
    this.moveTo(this.position.x + delta.x, this.position.y + delta.y);
  }

  moveTo (x, y) {
    var position = new Point(this.position.x, this.position.y);
    this.position.x = x;
    this.position.y = y;
    asafonov.messageBus.send(asafonov.events.FIELD_HERO_MOVED, {obj: this, fromPosition: position});
  }

  setWidth (width) {
    this.width = width;
    asafonov.messageBus.send(asafonov.events.HERO_WIDTH_CHANGED, {obj: this});
  }

  destroy() {
    console.log("Hero destroy");
  }
}
