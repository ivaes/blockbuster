class ScoreView {

  constructor() {
    this.element = document.querySelector('div.scores span');
    asafonov.messageBus.subscribe(asafonov.events.SCORES_UPDATED, this, 'onScoresUpdated');
  }

  onScoresUpdated (eventData) {
    this.displayScore(eventData.scores);
  }

  displayScore (score) {
    this.element.innerHTML = score;
  }

}
