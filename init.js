document.addEventListener("DOMContentLoaded", function(event) { 
  const view = new FieldView();
  window.view = view;
  document.querySelector('#start button').focus();
});

function start() {
  document.getElementById('start').style.display = 'none';
  asafonov.settings.sfx = document.querySelector('#start input[name=sfx]').checked;
  asafonov.settings.sfx && (new Audio('sound/ball.mp3')).play();
  const size = document.querySelector('#start select[name=size]').value.split('x');
  window.view.field = new Field(size[0], size[1]);
  window.view.init();
  const hero = new Subject();
  window.view.field.setHero(hero);
  const ball = new Ball();
  window.view.field.setBall(ball);
  const levels = new Levels(window.view.field);
  window.view.field.setObjectMap(levels.getRandom());
  const score = new Score(hero, ball);
  const scoreView = new ScoreView();
}
