const main_button = document.querySelector(".nav_main_button");
const future_button = document.querySelector(".nav_future_button");
const modal = document.getElementById('modal');
const close_modal_button = modal.querySelector('.close_modal_btn');
const creators_text = document.getElementById("creators_text");
const searchInput = document.getElementById('search_input');
const victorsList = document.getElementById('victors_list');
const modalMediaBox = document.getElementById('modal_media_box');

container2.style.display = 'none';
main_button.disabled = true;

// вкладки

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
  if (button.classList.contains('close_modal_btn')) return;

  const card = button.closest('.card');
  if (!card || !card.id.startsWith("main_card") || card.id === 'main_card0') return;

  const id = parseInt(card.id.slice(9)) - 1;
  const level = main_list[id];

  document.getElementById("verifier_text").textContent = level.verifier;
  document.getElementById("level_text").textContent = level.name;

  // превью
  const img = document.getElementById("modal_lvl_image");
  img.src = "img/" + level.image;
  img.onerror = function () { this.src = "img/no_image.png"; };

  // создатели
  const creators = level.creators.length > 0
    ? level.creators.join(", ")
    : "None";
  creators_text.textContent = creators;

  // викторы
  buildVictorsList(level);

  modal.style.display = 'block';
  modal.scrollTop = 0;
});

function buildVictorsList(level) {
  victorsList.innerHTML = '';

  // верифер
  if (level.verifier && level.verifier !== "player") {
    const row = createVictorRow(level.verifier, 100, level.verifyVideo || "", true);
    victorsList.appendChild(row);
  }

  // другие
  if (level.victors.length > 0) {
    for (let i = 0; i < level.victors.length; i++) {
      const v = level.victors[i];
      const row = createVictorRow(v.name, v.progress, v.video, false);
      victorsList.appendChild(row);
    }
  }

  // Пусто
  if ((!level.verifier || level.verifier === "player") && level.victors.length === 0) {
    const none = document.createElement('div');
    none.className = 'no_victors_text';
    none.textContent = 'No victors yet';
    victorsList.appendChild(none);
  }
}

function createVictorRow(name, progress, videoUrl, isVerifier) {
  const row = document.createElement('div');
  row.className = 'victor_row';

  // кнопка записи
  const btn = document.createElement('button');
  btn.className = 'victor_video_btn';

  const btnImg = document.createElement('img');
  btnImg.src = 'img/play.png';
  btnImg.alt = '▶';
  btnImg.onerror = function () {
    this.style.display = 'none';
    btn.textContent = '▶';
  };
  btn.appendChild(btnImg);

  if (videoUrl) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      window.open(videoUrl, '_blank');
    });
  } else {
    btn.style.opacity = '0.3';
    btn.style.cursor = 'default';
    btn.title = 'No video';
  }

  row.appendChild(btn);

  // ник
  const nameSpan = document.createElement('span');
  nameSpan.className = 'victor_name';
  nameSpan.textContent = name + (isVerifier ? ' (Verifier)' : '');
  row.appendChild(nameSpan);

  // прогресс
  const progressSpan = document.createElement('span');
  progressSpan.className = 'victor_progress';
  if (progress >= 100) {
    progressSpan.classList.add('victor_progress_100');
    progressSpan.textContent = '100%';
  } else {
    progressSpan.classList.add('victor_progress_partial');
    progressSpan.textContent = progress + '%';
  }
  row.appendChild(progressSpan);

  return row;
}

// копирование айди

document.addEventListener('click', function (e) {
  const lvlId = e.target.closest('.lvl_id');
  if (!lvlId) return;

  const id = lvlId.textContent.slice(4);
  navigator.clipboard.writeText(id).then(() => {
    const originalText = lvlId.textContent;
    lvlId.textContent = "Copied!";
    lvlId.style.color = "#99ffcc";
    setTimeout(() => {
      lvlId.textContent = originalText;
      lvlId.style.color = "";
    }, 1000);
  });
});
