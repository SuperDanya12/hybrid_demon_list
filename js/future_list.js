const container2 = document.getElementById("container2");
const original2 = document.getElementById("future_card0");

for (let i = 0; i < future_list.length; i++) {
  const clone = original2.cloneNode(true);
  clone.id = 'future_card' + (i + 1);

  const name = clone.querySelector(".info .name .text_pink_glow");
  const author = clone.querySelector(".info .author");
  const image = clone.querySelector(".lvl_image");
  const status = clone.querySelector(".status");

  name.textContent = future_list[i].name;
  author.textContent = "by " + future_list[i].author;
  status.textContent = "Status: " + future_list[i].status;
  image.src = "img/" + future_list[i].image;

  container2.appendChild(clone);
}

original2.style.display = 'none';
