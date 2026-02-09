const main_list = [
  {name: "Miha Difficult", creators: ["KuratheGuy","MihaMilos","Triscis","Hexy","Gamecheese"], id: "240", image: "miha_difficult.png", verifier: "Lunikay", victors: []},

  {name: "Chaos Circles", creators: ["MiRPacK19"], id: "620", image: "chaos_circles.png", verifier: "MiRPacK19", victors: []},

  {name: "Also Anathema", creators: ["Burda5800gd","Kosmos","PERFARATARRRRRR"], id: "665", image: "also_anathema.png", verifier: "Burda5800gd", victors: ["Kwist"]},

  {name: "Platinum Circles", creators: ["2Rus"], id: "180", image: "platinum_circles.png", verifier: "player", victors: []},

  {name: "EQU1NOX", creators: ["TW1ST3D"], id: "300", image: "equ1nox.png", verifier: "player", victors: []},

  {name: "ILOVEWAVE", creators: ["Burda5800gd"], id: "408", image: "ilovewave.png", verifier: "Burda5800gd", victors: ["Kwist"]},

  {name: "Evil Pebble", creators: ["SuperDanya12"], id: "398", image: "evil_pebble.png", verifier: "SuperDanya12", victors: ["Burda5800gd","Kwist"]},

  {name: "toxic waste", creators: ["KraM"], id: "644", image: "toxic_waste.png", verifier: "TimurBossGD", victors: ["Kwist"]},

  {name: "MAYMORY", creators: ["Kosmos"], id: "393", image: "maymory.png", verifier: "Kosmos", victors: ["Burda5800gd","Kwist"]},

  {name: "DIACET", creators: ["ZippRolex"], id: "566", image: "diacet.png", verifier: "player", victors: []},

  {name: "CDVG", creators: ["pushkin228"], id: "241", image: "cdvg.png", verifier: "player", victors: []},

  {name: "Dual Switch", creators: ["Kosmos"], id: "639", image: "dual_switch.png", verifier: "Kosmos", victors: []},

  {name: "2p Force", creators: ["BiseikaGMD"], id: "443", image: "2p_force.png", verifier: "Kwist", victors: []},

  {name: "goida epta", creators: ["jaggeddima"], id: "429", image: "goida_epta.png", verifier: "jaggeddima", victors: ["Kwist"]},

  {name: "Fractured Reality", creators: ["diore"], id: "301", image: "fractured_reality.png", verifier: "player", victors: []},

  {name: "Sine Wave", creators: ["Burda5800gd"], id: "405", image: "sine_wave.png", verifier: "Burda5800gd", victors: []},

  {name: "Unbound", creators: ["TW1ST3D"], id: "367", image: "unbound.png", verifier: "player", victors: []},

  {name: "Heaven and Hell", creators: ["SnowballZn"], id: "412", image: "heaven_and_hell.png", verifier: "SnowballZn", victors: ["TimurBossGD","Kwist"]},

  {name: "THinkINg Fuck", creators: ["jaggeddima"], id: "127", image: "thinking_fuck.png", verifier: "jaggeddima", victors: ["Burda5800gd","Kwist"]},

  {name: "8 Bit Game", creators: ["Kosmos"], id: "396", image: "8_bit_game.png", verifier: "Kosmos", victors: []},

  {name: "prism attack", creators: ["chaynik"], id: "582", image: "prism_attack.png", verifier: "player", victors: []},

  {name: "DzhunGarik", creators: ["diore"], id: "316", image: "dzhungarik.png", verifier: "player", victors: []},

  {name: "WWW ship", creators: ["Sqwizzy"], id: "638", image: "www_ship.png", verifier: "player", victors: []},

  {name: "U are an idiot", creators: ["Burda5800gd"], id: "404", image: "u_are_an_idiot.png", verifier: "Burda5800gd", victors: []},

  {name: "El3CTr0 C1rcLeS", creators: ["jaggeddima"], id: "227", image: "el3ctr0_c1rcles.png", verifier: "jaggeddima", victors: []},

  {name: "Lava Bounce", creators: ["Kosmos"], id: "394", image: "lava_bounce.png", verifier: "Kosmos", victors: ["SuperDanya12"]}
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
  if (main_list[i].creators.length > 1) {
    author.textContent = "by "+main_list[i].creators[0]+" & More"
  } else { author.textContent = "by "+main_list[i].creators[0]}
  id.textContent = "ID: "+main_list[i].id;
  image.src = "img/"+main_list[i].image;
  container.appendChild(clone);
}
original.style.display = 'none';
