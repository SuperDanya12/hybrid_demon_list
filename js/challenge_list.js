const container3 = document.getElementById("container3");
const originalChallenge = document.getElementById("challenge_card0");

for (let i = 0; i < challenge_list.length; i++) {
  const clone = originalChallenge.cloneNode(true);
  clone.id = 'challenge_card' + (i + 1);

  const place = clone.querySelector(".info .name .text_blue_glow");
  const name = clone.querySelector(".info .name .text_pink_glow");
  const author = clone.querySelector(".info .author");
  const id = clone.querySelector(".info .lvl_id");
  const image = clone.querySelector(".lvl_image");
  const points = clone.querySelector(".lvl_points");
  const victorsCount = clone.querySelector(".victors_count");

  place.textContent = "#" + (i + 1);
  name.textContent = " " + challenge_list[i].name;
  author.textContent = challenge_list[i].creators.length > 1
    ? "by " + challenge_list[i].creators[0] + " & More"
    : "by " + challenge_list[i].creators[0];
  id.textContent = "ID: " + challenge_list[i].id;
  points.textContent = "Points: " + challenge_list[i].points;

  let count = 0;
  if (challenge_list[i].verifier !== "player") count++;
  for (let j = 0; j < challenge_list[i].victors.length; j++) {
    if (challenge_list[i].victors[j].progress >= 100) count++;
  }
  victorsCount.textContent = "Victors: " + count;

  image.src = "img/" + challenge_list[i].image;
  container3.appendChild(clone);
}

originalChallenge.style.display = 'none';
