const container = document.getElementById("container");
const original = document.getElementById("player_card0");
const playerModal = document.getElementById("player_modal");
const closePlayerModalBtn = playerModal.querySelector(".close_player_modal_btn");

const navAllBtn = document.querySelector(".nav_all_button");
const navMainBtn = document.querySelector(".nav_main_button");
const navChallengeBtn = document.querySelector(".nav_challenge_button");

// собираем данные по main_list
function buildPlayersFromList(levelList, listTag) {
  const players = {};
  for (let i = 0; i < levelList.length; i++) {
    const level = levelList[i];

    // верифер
    if (level.verifier !== "player") {
      if (!players[level.verifier]) {
        players[level.verifier] = { player: level.verifier, points: 0, levels: [] };
      }
      players[level.verifier].points += level.points;
      players[level.verifier].levels.push({
        name: level.name, progress: 100, pts: level.points, role: "Verifier", tag: listTag
      });
    }

    // викторы
    for (let j = 0; j < level.victors.length; j++) {
      const v = level.victors[j];
      if (v.progress < 25) continue;

      if (!players[v.name]) {
        players[v.name] = { player: v.name, points: 0, levels: [] };
      }
      const pts = calculatePoints(level.points, v.progress);
      players[v.name].points += pts;
      players[v.name].levels.push({
        name: level.name, progress: v.progress, pts: pts, role: "", tag: listTag
      });
    }
  }
  return players;
}

function mergePlayerMaps() {
  const mainPlayers = buildPlayersFromList(main_list, "Main");
  const challengePlayers = buildPlayersFromList(challenge_list, "Challenge");

  // all: объединяем
  const allMap = {};
  [mainPlayers, challengePlayers].forEach(map => {
    for (const name in map) {
      if (!allMap[name]) {
        allMap[name] = { player: name, points: 0, levels: [] };
      }
      allMap[name].points += map[name].points;
      allMap[name].levels = allMap[name].levels.concat(map[name].levels);
    }
  });

  // main only
  const mainArr = Object.values(mainPlayers);
  mainArr.forEach(p => p.points = Math.round(p.points * 100) / 100);
  mainArr.sort((a, b) => b.points - a.points);

  // challenge only
  const challengeArr = Object.values(challengePlayers);
  challengeArr.forEach(p => p.points = Math.round(p.points * 100) / 100);
  challengeArr.sort((a, b) => b.points - a.points);

  // all
  const allArr = Object.values(allMap);
  allArr.forEach(p => p.points = Math.round(p.points * 100) / 100);
  allArr.sort((a, b) => b.points - a.points);

  return { all: allArr, main: mainArr, challenge: challengeArr };
}

const playerData = mergePlayerMaps();
let currentPlayerList = playerData.all;

function renderPlayerCards(list) {
  // удаляем все кроме шаблона
  const cards = container.querySelectorAll('.player_card');
  cards.forEach(card => {
    if (card.id !== 'player_card0') card.remove();
  });

  for (let i = 0; i < list.length; i++) {
    const clone = original.cloneNode(true);
    clone.id = 'player_card' + (i + 1);
    clone.style.display = '';
    clone.dataset.playerIndex = i;

    const place = clone.querySelector(".player_name .text_blue_glow");
    const name = clone.querySelector(".player_name .text_pink_glow");
    const points = clone.querySelector(".player_points");

    place.textContent = "#" + (i + 1);
    name.textContent = " " + list[i].player;
    points.textContent = "Points: " + list[i].points;

    container.appendChild(clone);
  }
}

// инит
original.style.display = 'none';
navAllBtn.disabled = true;
renderPlayerCards(currentPlayerList);

navAllBtn.addEventListener('click', function () {
  currentPlayerList = playerData.all;
  navAllBtn.disabled = true;
  navMainBtn.disabled = false;
  navChallengeBtn.disabled = false;
  renderPlayerCards(currentPlayerList);
});

navMainBtn.addEventListener('click', function () {
  currentPlayerList = playerData.main;
  navMainBtn.disabled = true;
  navAllBtn.disabled = false;
  navChallengeBtn.disabled = false;
  renderPlayerCards(currentPlayerList);
});

navChallengeBtn.addEventListener('click', function () {
  currentPlayerList = playerData.challenge;
  navChallengeBtn.disabled = true;
  navAllBtn.disabled = false;
  navMainBtn.disabled = false;
  renderPlayerCards(currentPlayerList);
});

// модалка игрока

document.addEventListener('click', function (e) {
  const btn = e.target.closest('.player_detail_btn');
  if (!btn) return;
  const card = btn.closest('.player_card');
  if (!card || card.id === 'player_card0') return;

  const idx = parseInt(card.dataset.playerIndex);
  const player = currentPlayerList[idx];

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
    let labelParts = lv.name;
    if (lv.role) labelParts += ' (' + lv.role + ')';
    nameSpan.textContent = labelParts;
    row.appendChild(nameSpan);

    if (lv.tag) {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'player_level_tag';
      tagSpan.textContent = '[' + lv.tag + ']';
      row.appendChild(tagSpan);
    }

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
