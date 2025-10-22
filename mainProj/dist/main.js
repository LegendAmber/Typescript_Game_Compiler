import { World } from "./worldGen.js";
import { SaveState, loadState } from "./dataHandling.js";
import { CreateChunk } from "./chunk.js";
import { TERRAIN_TYPE_ANTI_GRAVITY, TERRAIN_TYPE_DEFAULT_UNDERGROUND } from "./interface/worldInterface.js";
let spawnChunks = [new CreateChunk(1, { type: TERRAIN_TYPE_ANTI_GRAVITY }, { type: TERRAIN_TYPE_DEFAULT_UNDERGROUND }), new CreateChunk(1, { type: TERRAIN_TYPE_ANTI_GRAVITY }, { type: TERRAIN_TYPE_DEFAULT_UNDERGROUND })];
let worldInstance = new World("My great world", 1200, { type: "clear" }, [], [], World.generateSeed(), 270, [World.createSpawnpointDefault(1, 1, spawnChunks[0])]);
SaveState(worldInstance, worldInstance.name);
let session = {
    fullscreenStatus: false
};
let globalValues = loadState("userPref");
//On first/clear of browser data
if (!globalValues) {
    globalValues = {
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
        fontSize: "2dvh",
        borderStyle: "solid",
        textboxColorScheme: "light",
        currentKey: ""
    };
    SaveState(globalValues, "userPref");
}
let gameWindow = false;
let css = document.createElement("style");
let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
const FileImportStyleSheet = fetch("style.css").then(res => res.text()).catch(err => err);
let StyleSheetResult;
styleSheetGlobal();
async function styleSheetGlobal() {
    try {
        StyleSheetResult = await FileImportStyleSheet;
    }
    catch (err) {
        console.error("Document not found / " + err);
    }
    css.innerHTML = StyleSheetResult;
    document.head.appendChild(css);
}
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
    startButton.innerHTML = "Start";
    settingsButton.innerText = "Settings";
    startButton.onclick = () => {
        pageElement.remove();
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
    let inputVolume = document.getElementById("input_volume");
    let inputValue = document.getElementById("input_value");
    inputVolume.value = globalValues.volume.toString();
    inputValue.innerText = globalValues.volume.toString() + " %";
    inputVolume.onchange = () => {
        globalValues.volume = parseInt(inputVolume.value, 10);
        SaveState(globalValues, "userPref");
    };
    inputVolume.oninput = () => {
        inputValue.innerText = inputVolume.value + " %";
    };
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
    let keybindBtn = document.getElementById("keybinding");
    keybindBtn.onclick = () => {
        document.body.removeChild(pageElement);
        keybindsScreen();
    };
}
const FileImportGameScreen = fetch("./assets/gameScreen.html").then(res => res.text()).catch(err => err);
let GameScreenResult;
async function gameSelectScreen() {
    try {
        GameScreenResult = await FileImportGameScreen;
    }
    catch (err) {
        console.error("Error occured: " + err);
    }
    let pageElement = document.createElement("div");
    pageElement.id = "gameScreen";
    pageElement.innerHTML = GameScreenResult;
    document.body.appendChild(pageElement);
}
const FileImportDisplayScreen = fetch("./assets/displayScreen.html").then(res => res.text()).catch(err => err);
let DisplayResult;
async function displayScreen() {
    try {
        DisplayResult = await FileImportDisplayScreen;
    }
    catch (err) {
        console.error("Error occured: " + err);
    }
    let pageElement = document.createElement("div");
    pageElement.id = "displayScreen";
    pageElement.innerHTML = DisplayResult;
    document.body.appendChild(pageElement);
    let fullscreenBtn = document.getElementById("fullscreenBtn");
    let textSizeBtn = document.getElementById("textSizeBtn");
    let colorSchemeBtn = document.getElementById("colorSchemeBtn");
    let borderStyleBtn = document.getElementById("borderStyleBtn");
    let backButton = document.getElementById("back");
    backButton.onclick = () => {
        document.body.removeChild(pageElement);
        settingsScreen();
    };
    if (!session.fullscreenStatus) {
        fullscreenBtn.innerText = "Enter Fullscreen";
    }
    else {
        fullscreenBtn.innerText = "Exit Fullscreen";
    }
    fullscreenBtn.onclick = () => {
        if (!session.fullscreenStatus) {
            fullscreenBtn.innerText = "Exit Fullscreen";
            document.documentElement.requestFullscreen();
            session.fullscreenStatus = true;
        }
        else if (session.fullscreenStatus) {
            fullscreenBtn.innerText = "Enter Fullscreen";
            session.fullscreenStatus = false;
            document.exitFullscreen();
        }
    };
    textSizeBtn.onclick = () => {
        document.body.removeChild(pageElement);
        textScreenSize();
    };
}
const FileImportTextSizeScreen = fetch("./assets/displayAssets/TextSizeScreen.html").then(res => res.text()).catch(err => err);
let TextScreenSizeResult;
async function textScreenSize() {
    try {
        TextScreenSizeResult = await FileImportTextSizeScreen;
    }
    catch (err) {
        console.error("Error Occured: " + err);
    }
    let pageElement = document.createElement("div");
    pageElement.id = "textsizeScreen";
    pageElement.innerHTML = TextScreenSizeResult;
    document.body.appendChild(pageElement);
    let buttons = [document.getElementById("small"), document.getElementById("medium"), document.getElementById("large"), document.getElementById("xlarge"), document.getElementById("xxlarge")];
    buttons.forEach(item => {
        let chosenState;
        item.addEventListener('click', e => {
            switch (e.target) {
                case buttons[0]:
                    chosenState = "1.5dvh";
                    break;
                case buttons[1]:
                    chosenState = "2dvh";
                    break;
                case buttons[2]:
                    chosenState = "2.5dvh";
                    break;
                case buttons[3]:
                    chosenState = "3dvh";
                    break;
                case buttons[4]:
                    chosenState = "3.5dvh";
                    break;
                default:
                    console.error("Incorrect Param passed");
                    break;
            }
            globalValues.fontSize = chosenState;
            SaveState(globalValues, "userPref");
        });
    });
}
const FileImportKeybindsScreen = fetch("./assets/keybindsScreen.html").then(res => res.text()).catch(err => err);
let KeybindResult;
async function keybindsScreen() {
    try {
        KeybindResult = await FileImportKeybindsScreen;
    }
    catch (err) {
        console.error("Error occured" + err);
    }
    let pageElement = document.createElement("div");
    pageElement.innerHTML = KeybindResult;
    pageElement.id = "keybindScreen";
    document.body.appendChild(pageElement);
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
