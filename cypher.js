var bigbrother;

function cypher_init() {}
function cypher_sleep() {
  btn = document.getElementById("btn_startCypher");

  var acordar = btn.textContent == "Acordar o Cypher" ? false : true;

  if (!acordar) {
    bigbrother.stopListening();
    btn.classList.remove("is-inverted");
    btn.classList.replace("is-danger", "is-primary");
    btn.textContent = "Acordar o Cypher";
  } else {
    btn.classList.add("is-inverted");
    btn.classList.replace("is-primary", "is-danger");
    btn.textContent = "Adormecer o Cypher";
    acordar = false;
    cypher_init();
  }
}
