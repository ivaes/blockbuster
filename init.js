document.addEventListener("DOMContentLoaded", function(event) { 
  var view = new FieldView();
  view.field = new Field();
  view.init();
  window.view = view;
  document.querySelector('#start button').focus();
});

function start() {
  document.getElementById('start').style.display = 'none';
  (new Audio('sound/explosion.mp3')).play();
  var ball = new Ball();
  window.view.field.setBall(ball);
  window.view.field.setHero(new Subject());
  var levels = new Levels(window.view.field);
  window.view.field.setObjectMap(levels.getRandom());
}
