const main_button = document.querySelector(".nav_main_button");
const future_button = document.querySelector(".nav_future_button");
const burger_button = document.querySelector(".burger_button");
const modal = document.getElementById('modal');
const close_modal_button = modal.querySelector('.button1');
const burger_menu = document.getElementById("burger_menu");


container2.style.display = 'none';

document.querySelector(".nav_main_button").addEventListener('click', function() {
  console.log('main');
  container2.style.display = 'none';
  container.style.display = 'block';
  main_button.disabled = true;
  future_button.disabled = false;
});

future_button.addEventListener('click', function() {
  console.log('future');
  container.style.display = 'none';
  container2.style.display = 'block';
  future_button.disabled = true;
  main_button.disabled = false;
});

close_modal_button.addEventListener('click', function() {
  console.log('close');
  modal.style.display = 'none';
});

document.addEventListener('click', function(e) {
    const button = e.target.closest('.button1');
    if (button) {
        if (button.parentElement.parentElement.id.slice(0,9) == "main_card") {
          id = (button.parentElement.parentElement.id.slice(9))-1;
          let verifer_text = document.getElementById("verifer_text")
          let level_text = document.getElementById("level_text");;
          let victors_text = document.getElementById("victors_text");;
          verifer_text.textContent = "Verifed by "+main_list[id].verifer;
          level_text.textContent =  main_list[id].name;
          let victors = ""
          if (main_list[id].victors && main_list[id].victors.length > 0) {
            main_list[id].victors.forEach((victor, index) => {
              if (index > 0) {
                victors+=", "+victor;
              } else {victors+=victor}
            });
          } else {
            victors = "None";
          }
          victors_text.textContent = "Victors: "+victors;
          modal.style.display = 'block';
        }
    }
});
burger_button.addEventListener('click', function() {
  if (burger_menu.style.display != 'flex') {
    burger_menu.style.display = 'flex';
  } else {
    burger_menu.style.display = 'none';
  }
});

document.addEventListener('click', function(e) {
    const button = e.target.closest('.lvl_id');
    if (button) {
      id = button.textContent.slice(4)
      try {
          navigator.clipboard.writeText(id);
        } catch (err) {
          console.error(err);
        }
    }
});
