document.addEventListener("DOMContentLoaded", function(event) { 
  const view = new FieldView();
  window.view = view;
  document.querySelector('#start button').focus();
  document.querySelector('input[name=sfx]').checked = window.localStorage.getItem('sfx') == "false" ? false : true;
  window.localStorage.getItem('size') && (document.querySelector('input[name=size]:checked').value = window.localStorage.getItem('size'));
});

function start() {
  document.getElementById('start').style.display = 'none';
  asafonov.settings.sfx = document.querySelector('input[name=sfx]').checked;
  asafonov.settings.sfx && (new Audio('sound/ball.mp3')).play();
  window.localStorage.setItem('size', document.querySelector('input[name=size]:checked').value);
  window.localStorage.setItem('sfx', asafonov.settings.sfx);

  // views and models
  const size = document.querySelector('input[name=size]:checked').value.split('x');
  window.view.field = new Field(size[0], size[1]);
  window.view.init();
  const hero = new Subject();
  window.view.field.setHero(hero);
  const ball = new Ball();
  window.view.field.setBall(ball);
  const levels = new Levels(window.view.field);
  window.view.field.setObjectMap(levels.getRandom());
  asafonov.score = new Score(hero, ball);
  const scoreView = new ScoreView();
}
