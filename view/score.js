class ScoreView {

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'scores';
    document.body.appendChild(this.element);
    this.displayScore(0);
    asafonov.messageBus.subscribe(asafonov.events.SCORES_UPDATED, this, 'onScoresUpdated');
  }

  onScoresUpdated (eventData) {
    this.displayScore(eventData.scores);
  }

  displayScore (score) {
    this.element.innerHTML = 'Score: ' + score;
  }

}
