window.asafonov = {};
window.asafonov.messageBus = new MessageBus();
window.asafonov.events = {
  FIELD_HERO_ADDED: 'fieldHeroAdded',
  FIELD_HERO_MOVED: 'fieldHeroMoved',
  HERO_WIDTH_CHANGED: 'heroWidthChanged',
  OBJECT_ADDED: 'objectAdded',
  OBJECT_COLLISION: 'objectCollision',
  BALL_ADDED: 'ballAdded',
  BALL_MOVED: 'ballMoved',
  BALL_CHANGED_DIRECTION: 'ballChangedDirection',
  GAME_WON: 'gameWon',
  GAME_LOST: 'gameLost'
};
window.asafonov.bonuses = [HeroWidthBonus],
window.asafonov.settings = {
  sfx: false,
  heroWidth: 5
}
