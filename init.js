document.addEventListener("DOMContentLoaded", function(event) { 
  var view = new FieldView();
  view.field = new Field();
  view.init();
  window.view = view;
  document.querySelector('#start button').focus();
});

function start() {
  document.getElementById('start').style.display = 'none';
  asafonov.settings.sfx = document.querySelector('#start input[name=sfx]').checked;
  asafonov.settings.sfx && (new Audio('sound/ball.mp3')).play();
  window.view.field.setHero(new Subject());
  var ball = new Ball();
  window.view.field.setBall(ball);
  var levels = new Levels(window.view.field);
  window.view.field.setObjectMap(levels.getRandom());
}
