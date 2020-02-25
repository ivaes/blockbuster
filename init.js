document.addEventListener("DOMContentLoaded", function(event) { 
  var view = new FieldView();
  view.field = new Field();
  view.init();
  view.field.setHero(new Subject());
  var ball = new Ball();
  view.field.setBall(ball);
  var objectMap = [null];
});
