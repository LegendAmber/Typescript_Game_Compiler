"use strict";
let globalValues = {
    volume: 50,
    gameInteraction: {
        up: "w",
        down: "s",
        left: "a",
        right: "d",
        jump: " ",
        interact: "e",
        inventory: "i",
        menu: "Escape"
    },
    devMode: false,
    fontSize: 16,
    borderStyle: "solid",
    fullscreen: false,
    textboxColorScheme: "light",
    currentKey: ""
};
let gameWindow = false;
console.log("Connection Established");
let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
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
        document.body.appendChild(canvas);
        gameRender();
        pageElement.remove();
        gameWindow = true;
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
    let pageElement = document.createElement("div");
    pageElement.id = "settingsScreen";
    pageElement.innerHTML = SettingsResult;
    document.body.appendChild(pageElement);
    let backButton = document.getElementById("back");
    backButton.onclick = () => {
        document.body.removeChild(pageElement);
        titleScreen();
    };
    let displaySettingsButton = document.getElementById("display");
    displaySettingsButton.onclick = () => {
        document.body.removeChild(pageElement);
        displayScreen();
    };
}
const FileImportDisplayScreen = fetch("./assets/displayScreen.html").then(res => res.text()).catch(err => err);
let DisplayResult;
async function displayScreen() {
    try {
        DisplayResult = await FileImportDisplayScreen;
    }
    catch (err) {
        err;
    }
    let pageElement = document.createElement("div");
    pageElement.id = "displayScreen";
    pageElement.innerHTML = DisplayResult;
    document.body.appendChild(pageElement);
    let backButton = document.getElementById("back");
    backButton.onclick = () => {
        document.body.removeChild(pageElement);
        settingsScreen();
    };
}
let gameAnimationFrame;
let gameRender = () => {
    gameAnimationFrame = requestAnimationFrame(gameRender);
    if (!gameWindow)
        cancelAnimationFrame(gameAnimationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Game rendering logic goes here
    ctx.fillStyle = "black";
    ctx.fillRect(50, 50, 100, 100);
    ctx.fill();
};
const FileImportESCScreen = fetch("./assets/escMenu.html").then(res => res.text()).catch(err => err);
let ESCResult;
let escMenuOpen = false;
async function escMenu() {
    if (!escMenuOpen) {
        escMenuOpen = true;
        try {
            ESCResult = await FileImportESCScreen;
        }
        catch (err) {
            err;
        }
        let pageElement = document.createElement("div");
        pageElement.id = "escMenu";
        pageElement.innerHTML = ESCResult;
        pageElement.style.position = "absolute";
        pageElement.style.top = "0px";
        pageElement.style.left = "0px";
        pageElement.style.width = "100dvw";
        pageElement.style.height = "100dvh";
        pageElement.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        document.body.appendChild(pageElement);
        let resumeButton = document.getElementById("resumeBtn");
        resumeButton.onclick = () => {
            escMenu();
        };
        let escSettingsButton = document.getElementById("settingsBtn");
        escSettingsButton.onclick = () => {
            escMenu();
            document.body.removeChild(canvas);
            gameWindow = false;
            settingsScreen();
        };
        let quitButton = document.getElementById("mainMenuBtn");
        quitButton.onclick = () => {
            escMenu();
            document.body.removeChild(canvas);
            gameWindow = false;
            titleScreen();
        };
    }
    else {
        escMenuOpen = false;
        let escElement = document.getElementById("escMenu");
        escElement.remove();
    }
}
window.addEventListener("keydown", e => {
    switch (e.key) {
        case globalValues.gameInteraction.menu:
            if (gameWindow)
                escMenu();
            break;
        case "F2":
            if (globalValues.devMode)
                console.log("Dev Mode Active");
            break;
        case globalValues.gameInteraction.left:
            console.log("Left");
            break;
        case globalValues.gameInteraction.right:
            console.log("Right");
            break;
        case globalValues.gameInteraction.up:
            console.log("Up");
            break;
        case globalValues.gameInteraction.down:
            console.log("Down");
            break;
        case globalValues.gameInteraction.jump:
            console.log("Jump");
            break;
        case globalValues.gameInteraction.interact:
            console.log("Interact");
            break;
        case globalValues.gameInteraction.inventory:
            console.log("Inventory");
            break;
        default:
            globalValues.currentKey = e.key;
            console.debug(`Current Key Pressed: ${globalValues.currentKey}`);
            break;
    }
});
window.addEventListener("keyup", e => {
    switch (e.key) {
        case globalValues.gameInteraction.left:
            console.log("Left Released");
            break;
        case globalValues.gameInteraction.right:
            console.log("Right Released");
            break;
        case globalValues.gameInteraction.up:
            console.log("Up Released");
            break;
        case globalValues.gameInteraction.down:
            console.log("Down Released");
            break;
        case globalValues.gameInteraction.jump:
            console.log("Jump Released");
            break;
        case globalValues.gameInteraction.interact:
            console.log("Interact Released");
            break;
        case globalValues.gameInteraction.inventory:
            console.log("Inventory Released");
            break;
        default:
            console.debug(`Current Key Released: ${e.key}`);
            break;
    }
});
