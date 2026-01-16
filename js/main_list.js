const main_list = [
  {name: "Miha Difficult", author: "KuratheGuy", id: "240", image: "miha_difficult.png", verifer: "Lunikay", victors: []},

  {name: "Also Anathema", author: "Burda5800gd", id: "665", image: "also_anathema.png", verifer: "Burda5800gd", victors: ["Kwist"]},

  {name: "EQU1NOX", author: "TW1ST3D", id: "300", image: "equ1nox.png", verifer: "player", victors: []},

  {name: "Platinum Circles", author: "2Rus", id: "180", image: "platinum_circles.png", verifer: "player", victors: []},

  {name: "ILOVEWAVE", author: "Burda5800gd", id: "408", image: "ilovewave.png", verifer: "Burda5800gd", victors: []},

  {name: "Evil Pebble", author: "SuperDanya12", id: "398", image: "evil_pebble.png", verifer: "SuperDanya12", victors: ["Burda5800gd"]},

  {name: "toxic waste", author: "KraM", id: "644", image: "toxic_waste.png", verifer: "TimurBossGD", victors: []},

  {name: "MAYMORY", author: "Kosmos", id: "393", image: "maymory.png", verifer: "Burda5800gd", victors: []}

];

const container = document.getElementById("container");
let original = document.getElementById("main_card0");

for (let i = 0; i < main_list.length; i++) {
  let clone = original.cloneNode(true);
  clone.id = 'main_card'+(i+1);
  let place = clone.querySelector(".info .name .text_blue_glow");
  let name = clone.querySelector(".info .name .text_pink_glow");
  let author = clone.querySelector(".info .author");
  let id = clone.querySelector(".info .lvl_id");
  let image = clone.querySelector(".lvl_image");
  place.textContent = "#"+(i+1);
  name.textContent = "- "+main_list[i].name;
  author.textContent = "by "+main_list[i].author;
  id.textContent = "ID: "+main_list[i].id;
  image.src = "img/"+main_list[i].image;
  container.appendChild(clone);
}
original.style.display = 'none';
