const main_button = document.querySelector(".nav_main_button");
const future_button = document.querySelector(".nav_future_button");
const modal = document.getElementById('modal');
const close_modal_button = modal.querySelector('.button1');
const creators_text = document.getElementById("creators_text");
const searchInput = document.getElementById('search_input');

container2.style.display = 'none';
main_button.disabled = true;

// --- вкладки

main_button.addEventListener('click', function () {
  container2.style.display = 'none';
  container.style.display = 'block';
  main_button.disabled = true;
  future_button.disabled = false;
  searchInput.value = '';
  resetSearch();
});

future_button.addEventListener('click', function () {
  container.style.display = 'none';
  container2.style.display = 'block';
  future_button.disabled = true;
  main_button.disabled = false;
  searchInput.value = '';
  resetSearch();
});

// поиск

function resetSearch() {
  container.querySelectorAll('.card').forEach(card => {
    if (card.id !== 'main_card0') card.style.display = 'flex';
  });
  container2.querySelectorAll('.card').forEach(card => {
    if (card.id !== 'future_card0') card.style.display = 'flex';
  });
}

searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase().trim();


  const isMainVisible = container.style.display !== 'none';

  if (isMainVisible) {
    // поиск1
    container.querySelectorAll('.card').forEach(card => {
      if (card.id === 'main_card0') return;
      const idx = parseInt(card.id.slice(9)) - 1;
      const level = main_list[idx];
      const name = level.name.toLowerCase();
      const creators = level.creators.join(' ').toLowerCase();
      const id = level.id;

      const match = name.includes(query) || creators.includes(query) || id.includes(query);
      card.style.display = match ? 'flex' : 'none';
    });
  } else {
    // поиск2
    container2.querySelectorAll('.card').forEach(card => {
      if (card.id === 'future_card0') return;
      const idx = parseInt(card.id.slice(11)) - 1;
      const level = future_list[idx];
      const name = level.name.toLowerCase();
      const author = level.author.toLowerCase();

      const match = name.includes(query) || author.includes(query);
      card.style.display = match ? 'flex' : 'none';
    });
  }
});

// модалка

close_modal_button.addEventListener('click', function () {
  modal.style.display = 'none';
});

modal.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('click', function (e) {
  const button = e.target.closest('.button1');
  if (!button) return;

  const card = button.parentElement.parentElement;
  if (!card.id.startsWith("main_card")) return;

  const id = parseInt(card.id.slice(9)) - 1;
  const level = main_list[id];

  document.getElementById("verifier_text").textContent = level.verifier;
  document.getElementById("level_text").textContent = level.name;

  const image = document.getElementById("modal_lvl_image");
  image.src = "img/" + level.image;
  image.onerror = function () { this.src = "img/no_image.png"; };

  const victors = level.victors.length > 0
    ? level.victors.join(", ")
    : "None";
  document.getElementById("victors_text").textContent = "Victors: " + victors;

  const creators = level.creators.length > 0
    ? level.creators.join(", ")
    : "None";
  creators_text.textContent = creators;

  modal.style.display = 'block';
});

// копирование айди

document.addEventListener('click', function (e) {
  const lvlId = e.target.closest('.lvl_id');
  if (!lvlId) return;

  const id = lvlId.textContent.slice(4);
  navigator.clipboard.writeText(id).then(() => {
    const original = lvlId.textContent;
    lvlId.textContent = "Copied!";
    lvlId.style.color = "#99ffcc";
    setTimeout(() => {
      lvlId.textContent = original;
      lvlId.style.color = "";
    }, 1000);
  });
});
