const container = document.getElementById("container");
const original = document.getElementById("player_card0");
const playerModal = document.getElementById("player_modal");
const closePlayerModalBtn = playerModal.querySelector(".close_player_modal_btn");

// игроки
const players_list = [];

for (let i = 0; i < main_list.length; i++) {
  const level = main_list[i];

  // верифер
  if (level.verifier !== "player") {
    let found = players_list.find(p => p.player === level.verifier);
    if (!found) {
      found = { player: level.verifier, points: 0, levels: [] };
      players_list.push(found);
    }
    found.points += level.points;
    found.levels.push({ name: level.name, progress: 100, pts: level.points, role: "Verifier" });
  }

  // викторы
  for (let j = 0; j < level.victors.length; j++) {
    const v = level.victors[j];
    if (v.progress < 25) continue;

    let found = players_list.find(p => p.player === v.name);
    if (!found) {
      found = { player: v.name, points: 0, levels: [] };
      players_list.push(found);
    }
    const pts = calculatePoints(level.points, v.progress);
    found.points += pts;
    found.levels.push({ name: level.name, progress: v.progress, pts: pts, role: "" });
  }
}

players_list.forEach(p => p.points = Math.round(p.points * 100) / 100);
players_list.sort((a, b) => b.points - a.points);

// карты
for (let i = 0; i < players_list.length; i++) {
  const clone = original.cloneNode(true);
  clone.id = 'player_card' + (i + 1);
  clone.dataset.playerIndex = i;

  const place = clone.querySelector(".player_name .text_blue_glow");
  const name = clone.querySelector(".player_name .text_pink_glow");
  const points = clone.querySelector(".player_points");

  place.textContent = "#" + (i + 1);
  name.textContent = " " + players_list[i].player;
  points.textContent = "Points: " + players_list[i].points;

  container.appendChild(clone);
}

original.style.display = 'none';

// модалка игрока

document.addEventListener('click', function (e) {
  const btn = e.target.closest('.player_detail_btn');
  if (!btn) return;
  const card = btn.closest('.player_card');
  if (!card || card.id === 'player_card0') return;

  const idx = parseInt(card.dataset.playerIndex);
  const player = players_list[idx];

  document.getElementById("pm_name").textContent = player.player;
  document.getElementById("pm_points").textContent = "Points: " + player.points;

  const levelsBox = document.getElementById("pm_levels");
  levelsBox.innerHTML = '';

  for (let i = 0; i < player.levels.length; i++) {
    const lv = player.levels[i];
    const row = document.createElement('div');
    row.className = 'player_level_row';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'player_level_name';
    nameSpan.textContent = lv.name + (lv.role ? ' (' + lv.role + ')' : '');
    row.appendChild(nameSpan);

    const progressSpan = document.createElement('span');
    if (lv.progress >= 100) {
      progressSpan.className = 'player_level_progress_100';
      progressSpan.textContent = '100%';
    } else {
      progressSpan.className = 'player_level_progress_partial';
      progressSpan.textContent = lv.progress + '%';
    }
    row.appendChild(progressSpan);

    const ptsSpan = document.createElement('span');
    ptsSpan.className = 'player_level_points';
    ptsSpan.textContent = '+' + lv.pts;
    row.appendChild(ptsSpan);

    levelsBox.appendChild(row);
  }

  playerModal.style.display = 'block';
});

closePlayerModalBtn.addEventListener('click', function () {
  playerModal.style.display = 'none';
});

playerModal.addEventListener('click', function (e) {
  if (e.target === playerModal) {
    playerModal.style.display = 'none';
  }
});
