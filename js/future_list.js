const future_list = [
  {name: "Toxic Waste Infinity", author: "SuperDanya12", image: "toxic_waste_infinity.png", status: "Building"},
  {name: "ILOVEWAVE II", author: "Burda5800gd", image: "ilovewave_ii.png", status: "Verifying"}
];

const container2 = document.getElementById("container2");
let original2 = document.getElementById("future_card0");

for (let i = 0; i < future_list.length; i++) {
  let clone = original2.cloneNode(true);
  clone.id = 'future_card'+(i+1);
  let name = clone.querySelector(".info .name .text_pink_glow");
  let author = clone.querySelector(".info .author");
  let image = clone.querySelector(".lvl_image");
  let status = clone.querySelector(".status");
  name.textContent = future_list[i].name;
  author.textContent = "by "+future_list[i].author;
  status.textContent = "Status: "+future_list[i].status;
  image.src = "img/"+future_list[i].image;
  container2.appendChild(clone);
}
original2.style.display = 'none';

