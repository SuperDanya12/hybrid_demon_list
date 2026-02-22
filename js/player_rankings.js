const container = document.getElementById("container");
const original = document.getElementById("player_card0");

// топ игроков
const players_list = [];

for (let i = 0; i < main_list.length; i++) {
  const level = main_list[i];

  if (level.verifier !== "player") {
    let found = players_list.find(p => p.player === level.verifier);
    if (!found) {
      found = { player: level.verifier, points: 0, levels: [] };
      players_list.push(found);
    }
    found.points += level.points;
    found.levels.push(level.id);
  }

  for (let j = 0; j < level.victors.length; j++) {
    let found = players_list.find(p => p.player === level.victors[j]);
    if (!found) {
      found = { player: level.victors[j], points: 0, levels: [] };
      players_list.push(found);
    }
    found.points += level.points;
    found.levels.push(level.id);
  }
}

players_list.forEach(p => p.points = Math.round(p.points * 100) / 100);
players_list.sort((a, b) => b.points - a.points);

// карты
for (let i = 0; i < players_list.length; i++) {
  const clone = original.cloneNode(true);
  clone.id = 'player_card' + (i + 1);

  const place = clone.querySelector(".player_name .text_blue_glow");
  const name = clone.querySelector(".player_name .text_pink_glow");
  const points = clone.querySelector(".player_points");
  // const levels = clone.querySelector(".player_levels");

  place.textContent = "#" + (i + 1);
  name.textContent = " " + players_list[i].player;
  points.textContent = "Points: " + players_list[i].points;
  // levels.textContent = "Level IDs: " + players_list[i].levels.join(", ");

  container.appendChild(clone);
}

original.style.display = 'none';
