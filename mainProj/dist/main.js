"use strict";
let globalValues = {
    volume: 50,
    movementControls: {
        up: "w",
        down: "s",
        left: "a",
        right: "d"
    },
    devMode: false,
    fontSize: 16,
    borderStyle: "solid",
    fullscreen: false,
    textboxColorScheme: "light"
};
let TitleResult;
const FileImportTitleScreen = fetch("./assets/titleScreen.html").then(res => res.text()).catch(err => err);
titleScreen();
async function titleScreen() {
    try {
        TitleResult = await FileImportTitleScreen;
    }
    catch (err) {
        console.error(err);
    }
    let title = "Arlien";
    let pageElement = document.createElement("div");
    pageElement.id = "titleScreen";
    pageElement.innerHTML = TitleResult;
    document.body.appendChild(pageElement);
    let titleElement = document.getElementById("title-text");
    let startButton = document.getElementById("start");
    let settingsButton = document.getElementById("settings");
    titleElement.innerText = title;
    startButton.innerHTML = "Start Game";
    settingsButton.innerText = "Settings";
    startButton.onclick = () => {
    };
    settingsButton.onclick = () => {
        document.body.removeChild(pageElement);
        settingsScreen();
    };
}
const FileImportSettingsScreen = fetch("./assets/settingsScreen.html").then(res => res.text()).catch(err => err);
let SettingsResult;
async function settingsScreen() {
    try {
        SettingsResult = await FileImportSettingsScreen;
    }
    catch (err) {
        err;
    }
    let title = "Settings";
    let pageElement = document.createElement("div");
    pageElement.id = "settingsScreen";
    pageElement.innerHTML = SettingsResult;
    document.body.appendChild(pageElement);
}
