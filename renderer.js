const { remote } = require("electron");

var lampada = "OFF";

var mqtt = require("mqtt");
var _topico = db.get("topico");

var client = mqtt.connect({
  host: db.get("ip"),
  port: db.get("porta"),
  username: db.get("user"),
  password: db.get("senha"),
});

function switch_lampada() {
  lampada = lampada == "OFF" ? "ON" : "OFF";
  console.log("Lampada está " + lampada);
  client.publish(_topico, lampada);
}

function set_lampada(estado) {
  console.log("Lampada está " + lampada);
  client.publish(_topico, estado);
}

// client.on("connect", function () {
//   console.log("CON");
//   client.subscribe("ha/quartoreinaldo/ac1/arcoiris/set", function (err) {
//     if (!err) {
//       client.publish("ha/quartoreinaldo/ac1/arcoiris/set", "Vel1");
//     }
//   });
// });

function dev() {
  var mainWindow = remote.getCurrentWindow();
  if (mainWindow.webContents.isDevToolsOpened()) {
    mainWindow.webContents.closeDevTools();
  } else {
    mainWindow.webContents.openDevTools();
  }
}
