class ScoreView {

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'scores';
    document.body.appendChild(this.element);
    asafonov.messageBus.subscribe(asafonov.events.SCORES_UPDATED, this, 'onScoresUpdated');
  }

  onScoresUpdated (eventData) {
    this.element.innerHTML = 'Score: ' + eventData.scores;
  }

}
