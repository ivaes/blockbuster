class Score {

  constructor (hero, ball) {
    this.hero = hero;
    this.ball = ball;
    this.scores = 0;
    this.highscore = this.getHighScore();
    this.highscoreReported = false;
    asafonov.messageBus.subscribe(asafonov.events.OBJECT_COLLISION, this, 'onObjectCollision');
  }

  onObjectCollision (eventData) {
    this.scores += parseInt(Score.BASE_SCORE / (++eventData.type) * this.ball.angle * this.ball.speed * this.hero.speed * (this.hero.width < asafonov.settings.heroWidth ? 2 : 1) * (this.hero.width > asafonov.settings.heroWidth ? 1/2 : 1), 10);
    asafonov.messageBus.send(asafonov.events.SCORES_UPDATED, {scores: this.scores});
    this.isNewHighScore() && ! this.highscoreReported && (this.highscoreReported = true) && asafonov.messageBus.send(asafonov.events.NEW_HIGHSCORE, {highscore: this.scores});
  }

  getHighScore() {
    return window.localStorage.getItem('highscore') || 0;
  }

  updateHighScore() {
    window.localStorage.setItem('highscore', this.scores);
    return true;
  }

  isNewHighScore() {
    return this.scores > this.highscore;
  }
}

Score.BASE_SCORE = 8;
