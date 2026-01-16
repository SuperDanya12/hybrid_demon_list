const future_button = document.querySelector(".nav_future_button");
const burger_button = document.querySelector(".burger_button");
const burger_menu = document.getElementById("burger_menu");

burger_button.addEventListener('click', function() {
  if (burger_menu.style.display != 'flex') {
    burger_menu.style.display = 'flex';
  } else {
    burger_menu.style.display = 'none';
  }
});
