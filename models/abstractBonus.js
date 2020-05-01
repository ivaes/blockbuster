class AbstractBonus {
  constructor (hero, obj) {
    this.timeout = 20000;
    this.hero = hero;
    this.obj = obj
    this.reverseProxy = this.reverse.bind(this);
  }

  // stub for override
  getMessage() {
  }

  // stub for override
  apply() {
    asafonov.messageBus.send(asafonov.events.BONUS_APPLIED, {message: this.getMessage()});
    setTimeout(this.reverseProxy, this.timeout);
  }

  // stub for override
  reverse() {
  }
}
