const burger_button = document.querySelector(".burger_button");
const burger_menu = document.getElementById("burger_menu");

burger_button.addEventListener('click', function () {
  burger_menu.style.display = burger_menu.style.display !== 'flex' ? 'flex' : 'none';
});

document.addEventListener('click', function (e) {
  if (!burger_menu.contains(e.target) && !burger_button.contains(e.target)) {
    burger_menu.style.display = 'none';
  }
});
