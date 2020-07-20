class BallView {

  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'ball';
    asafonov.messageBus.subscribe(asafonov.events.BALL_MOVED, this, 'onBallMoved');

    if (asafonov.settings.sfx) {
      this.ballChangedDirectionSound = new Audio('sound/ball.mp3');
      asafonov.messageBus.subscribe(asafonov.events.BALL_CHANGED_DIRECTION, this, 'onBallChangedDirection');
    }
  }

  setSize (width, height) {
    this.width = width || this.width;
    this.height = height || this.height;
    const displaySize = Math.min(this.width, this.height);
    this.element.style.width = displaySize + 'px';
    this.element.style.height = displaySize + 'px';
  }

  onBallMoved (eventData) {
    var position = eventData.obj.position;
    this.element.style.marginLeft = (this.width * position.x) + 'px';
    this.element.style.marginTop = (this.height * position.y) + 'px';
  }

  onBallChangedDirection() {
    this.ballChangedDirectionSound.play();
  }

  destroy() {
    asafonov.messageBus.unsubscribe(asafonov.events.BALL_MOVED, this, 'onBallMoved');

    if (asafonov.settings.sfx) {
      asafonov.messageBus.unsubscribe(asafonov.events.BALL_CHANGED_DIRECTION, this, 'onBallChangedDirection');
    }

    console.log("BallView destroy");
  }
}
