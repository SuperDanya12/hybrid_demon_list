const container = document.getElementById("container");
const original = document.getElementById("main_card0");

for (let i = 0; i < main_list.length; i++) {
  const clone = original.cloneNode(true);
  clone.id = 'main_card' + (i + 1);

  const place = clone.querySelector(".info .name .text_blue_glow");
  const name = clone.querySelector(".info .name .text_pink_glow");
  const author = clone.querySelector(".info .author");
  const id = clone.querySelector(".info .lvl_id");
  const image = clone.querySelector(".lvl_image");
  const points = clone.querySelector(".lvl_points");
  const victorsCount = clone.querySelector(".victors_count");

  place.textContent = "#" + (i + 1);
  name.textContent = " " + main_list[i].name;
  author.textContent = main_list[i].creators.length > 1
    ? "by " + main_list[i].creators[0] + " & More"
    : "by " + main_list[i].creators[0];
  id.textContent = "ID: " + main_list[i].id;
  points.textContent = "Points: " + main_list[i].points;

  let count = 0;
  if (main_list[i].verifier !== "player") count++;
  if (main_list[i].victors.count) {
    for (var j = 0; j < main_list[i].victors.length; i++) {
      if (main_list[i].victors[j].progress/100) count++;
    }
  }
  victorsCount.textContent = "Victors: " + count;

  image.src = "img/" + main_list[i].image;
  container.appendChild(clone);
}

original.style.display = 'none';
