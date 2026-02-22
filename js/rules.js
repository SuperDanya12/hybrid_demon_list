const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const rules_box1 = document.getElementById("rules_box1");
const rules_box2 = document.getElementById("rules_box2");

rules_box2.style.display = 'none';
button1.disabled = true;

button1.addEventListener('click', function () {
  rules_box2.style.display = 'none';
  rules_box1.style.display = 'block';
  button1.disabled = true;
  button2.disabled = false;
});

button2.addEventListener('click', function () {
  rules_box1.style.display = 'none';
  rules_box2.style.display = 'block';
  button2.disabled = true;
  button1.disabled = false;
});
