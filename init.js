document.addEventListener("DOMContentLoaded", function(event) { 
  var view = new FieldView();
  view.field = new Field();
  view.init();
  var ball = new Ball();
  view.field.setBall(ball);
  view.field.setHero(new Subject());
  var levels = new Levels(view.field);
  view.field.setObjectMap(levels.getRandom());
});
