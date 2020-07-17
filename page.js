const path = require("path");
const Store = require("electron-store");
const child_process = require("child_process");

const url = "https://teachablemachine.withgoogle.com/models/ZBcRMNUUC/";

var valor = 0;
var timer = 0;

var recognizer = null;

const db = new Store();

function get_db() {
  return db;
}

async function createModel() {
  const checkpointURL = url + "model.json"; // model topology
  const metadataURL = url + "metadata.json"; // model metadata

  const recognizer = speechCommands.create(
    "BROWSER_FFT", // fourier transform type, not useful to change
    undefined, // speech commands vocabulary feature, not useful for your models
    checkpointURL,
    metadataURL
  );

  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded().then(() => {
    var btn = document.getElementById("startBtn");
    btn.classList.remove("is-loading");
    btn.classList.replace("is-primary", "is-danger");
    btn.textContent = "Parar programa";
  });

  return recognizer;
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function call() {
  if (valor >= 0.85 && timer >= 30) {
    switch_lampada();
    timer = 0;
  }
}

setInterval(function () {
  var barra = document.getElementById("barra");
  barra.value = Math.round(lerp(valor * 100, barra.value, 0.1));
  timer += 1;
}, 33);

async function init() {
  var btn = document.getElementById("startBtn");

  if (btn.textContent == "Parar programa") {
    parar_programa();
  } else {
    btn.classList.add("is-loading");
    btn.classList.replace("is-danger", "is-primary");
    btn.textContent = "Iniciar programa";

    document.getElementById("barra").value = 0;

    recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    const labelContainer = document.getElementById("label-container");
    for (let i = 0; i < classLabels.length; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(
      (result) => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        for (let i = 0; i < classLabels.length; i++) {
          const classPrediction =
            classLabels[i] + ": " + result.scores[i].toFixed(2);
          labelContainer.childNodes[i].innerHTML = classPrediction;
        }
        valor = result.scores[0].toFixed(2);
        //spec = result.spectrogram;
        call();
      },
      {
        includeSpectrogram: false, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor:
          db.has("overlapSlider") == true ? db.get("overlapSlider") : 0.45, // probably want between 0.5 and 0.75. More info in README
      }

      // Stop the recognition in 5 seconds.
      // setTimeout(() => recognizer.stopListening(), 5000);
    );
  }
}

function save() {
  ip = document.getElementById("ip").value;
  senha = document.getElementById("senha").value;
  porta = document.getElementById("porta").value;
  user = document.getElementById("user").value;
  autostart_b = document.getElementById("autostart_brother").checked;
  slider = document.getElementById("overlapSlider").value;

  var dt = new Date();
  var now =
    "Editado por ultimo em " +
    ("0" + dt.getDate()).slice(-2) +
    "/" +
    ("0" + (dt.getMonth() + 1)).slice(-2) +
    "/" +
    dt.getFullYear() +
    " " +
    ("0" + dt.getHours()).slice(-2) +
    ":" +
    ("0" + dt.getMinutes()).slice(-2);

  db.set("ip", ip);
  db.set("senha", senha);
  db.set("porta", porta);
  db.set("user", user);
  db.set("autostart_brother", autostart_b);
  db.set("last_update", now);
  db.set("overlapSlider", slider);

  load_config();
}

function resetar() {
  ip = document.getElementById("ip");
  senha = document.getElementById("senha");
  porta = document.getElementById("porta");
  user = document.getElementById("user");
  autostart_b = document.getElementById("autostart_brother");

  ip.value = "";
  senha.value = "";
  porta.value = "";
  user.value = "";
  autostart_b.value = false;
  document.getElementById("overlapSlider").value = 0.45;

  parar_programa();
}

function parar_programa() {
  var btn = document.getElementById("startBtn");
  btn.classList.replace("is-danger", "is-primary");
  btn.textContent = "Iniciar programa";
  try {
    recognizer.stopListening();
  } catch {}
}

function load_config() {
  ip = document.getElementById("ip");
  senha = document.getElementById("senha");
  porta = document.getElementById("porta");
  user = document.getElementById("user");
  last = document.getElementById("last");
  autostart = document.getElementById("autostart_brother");
  slider = document.getElementById("overlapSlider");
  slidertxt = document.getElementById("sliderValue");

  if (db.has("ip")) ip.value = db.get("ip");
  if (db.has("senha")) senha.value = db.get("senha");
  if (db.has("porta")) porta.value = db.get("porta");
  if (db.has("user")) user.value = db.get("user");
  if (db.has("autostart_brother"))
    autostart.checked = db.get("autostart_brother");
  if (db.has("last_update")) last.innerHTML = db.get("last_update");
  if (db.has("overlapSlider")) slider.value = db.get("overlapSlider");
  if (db.has("overlapSlider")) slidertxt.innerHTML = db.get("overlapSlider");

  if (db.get("autostart_brother")) init();
}

function config_hide() {
  let c = document.getElementById("configpage");
  c.style.opacity = c.style.opacity == 100 ? 0 : 100;
}
