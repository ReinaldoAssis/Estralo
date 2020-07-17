var gulp = require("gulp");

var winInstaller = require("electron-windows-installer");

gulp.task("create-windows-installer", function (done) {
  winInstaller({
    appDirectory: "./node_modules/electron/dist",

    outputDirectory: "../Estralo-release",

    arch: "ia32",

    authors: "Reinaldo Assis",

    version: "1.0.0",

    iconUrl: "smarthome.ico",

    setupIcon: "smarthome.ico",

    loadingGif: "loading.gif",

    noMsi: true,
  })
    .then()
    .catch();
});
