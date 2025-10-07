interface StorageValues {
    volume: number;
    gameInteraction: {
        left: string, right: string, up: string, down: string, jump: string,
        interact: string, inventory: string, menu: string
    };
    devMode: boolean;
    fontSize: number;
    borderStyle: string;
    fullscreen: boolean;
    textboxColorScheme: string;
    currentKey: string;
}

interface Player {
    name: string;
    health: number;
    velocityX: number;
    velocityY: number;
    positionX: number;
    positionY: number;
    inventory: { item: string, quantity: number }[];
    stats: { attack: number, defense: number, speed: number, level: number, experience: number };
    hiddenStats: {
        inventory: number, deaths: number, timePlayed: number, enemiesDefeated: number,
        questsCompleted: number, debuffs: string[], buffs: string[], achievments: string[]
    };
    questList: string[];
}

interface TextBox{
    text: string;
    isActive: boolean;
    options?: string[];
    currentOptionIndex?: number;
    style: string;
    colorScheme: string;
}

interface SessionValues {
    fullscreenStatus: boolean;
}

/**
 * 
 * @param data Any StorageValues variable
 * @returns Status of request
 */

let SaveState = (data: StorageValues, storageArea: string) => {
    const jsondata = JSON.stringify(data);
    localStorage.setItem(storageArea, jsondata);
    return true;
}

/**
 * 
 * @param storageArea Name where stored data is
 * @returns Returns StorageState of the save state
 */

let loadState = (storageArea: string) => {
    const storedData: string = localStorage.getItem(storageArea) as string;
    return JSON.parse(storedData) as StorageValues;
}

let session: SessionValues = {
    fullscreenStatus: false
}
let globalValues: StorageValues = loadState("userPref");

//On first/clear of browser data
if(!globalValues){
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
        fontSize: 16,
        borderStyle: "solid",
        fullscreen: false,
        textboxColorScheme: "light",
        currentKey: ""
    }
    SaveState(globalValues, "userPref");
}

let gameWindow: boolean = false;

let canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

let TitleResult: string;
const FileImportTitleScreen: Promise<string> = fetch("./assets/titleScreen.html").then(res => res.text()).catch(err => err);
titleScreen();
async function titleScreen() {
    try {
        TitleResult = await FileImportTitleScreen;
    } catch (err) {
        console.error(err);
    }
    let title: string = "Arlien";
    let pageElement: HTMLDivElement = document.createElement("div");
    pageElement.id = "titleScreen";
    pageElement.innerHTML = TitleResult;
    document.body.appendChild(pageElement);
    let titleElement: HTMLHeadingElement = document.getElementById("title-text") as HTMLHeadingElement;
    let startButton: HTMLButtonElement = document.getElementById("start") as HTMLButtonElement;
    let settingsButton: HTMLButtonElement = document.getElementById("settings") as HTMLButtonElement;
    titleElement.innerText = title;
    startButton.innerHTML = "Start Game";
    settingsButton.innerText = "Settings";
    startButton.onclick = () => {
        document.body.appendChild(canvas);
        gameRender();
        pageElement.remove();
        gameWindow = true;
    }
    settingsButton.onclick = () => {
        document.body.removeChild(pageElement);
        settingsScreen();
    }
}

const FileImportSettingsScreen: Promise<string> = fetch("./assets/settingsScreen.html").then(res => res.text()).catch(err => err);
let SettingsResult: string;
async function settingsScreen() {
    try {
        SettingsResult = await FileImportSettingsScreen;
    } catch (err) {
        err;
    }
    let pageElement: HTMLDivElement = document.createElement("div");
    pageElement.id = "settingsScreen";
    pageElement.innerHTML = SettingsResult;
    document.body.appendChild(pageElement);
    let inputVolume = document.getElementById("input_volume") as HTMLInputElement;
    let inputValue = document.getElementById("input_value") as HTMLLabelElement;
    inputVolume.value = globalValues.volume.toString();
    inputValue.innerText = globalValues.volume.toString() + " %";
    inputVolume.onchange = () => {
        globalValues.volume = parseInt(inputVolume.value, 10);
        SaveState(globalValues, "userPref");
    }
    inputVolume.oninput = () => {
        inputValue.innerText = inputVolume.value + " %";
    }
    let backButton: HTMLButtonElement = document.getElementById("back") as HTMLButtonElement;
    backButton.onclick = () => {
        document.body.removeChild(pageElement);
        titleScreen();
    }
    let displaySettingsButton: HTMLButtonElement = document.getElementById("display") as HTMLButtonElement;
    displaySettingsButton.onclick = () => {
        document.body.removeChild(pageElement);
        displayScreen();
    }
}

const FileImportDisplayScreen: Promise<string> = fetch("./assets/displayScreen.html").then(res => res.text()).catch(err => err);
let DisplayResult: string;
async function displayScreen() {
    try {
        DisplayResult = await FileImportDisplayScreen;
    } catch (err) {
        console.error("Error occured: " + err);
    }
    let pageElement: HTMLDivElement = document.createElement("div");
    pageElement.id = "displayScreen";
    pageElement.innerHTML = DisplayResult;
    document.body.appendChild(pageElement);
    let fullscreenBtn: HTMLButtonElement = document.getElementById("fullscreenBtn") as HTMLButtonElement;
    let textSizeBtn: HTMLButtonElement = document.getElementById("textSizeBtn") as HTMLButtonElement;
    let colorSchemeBtn: HTMLButtonElement = document.getElementById("colorSchemeBtn") as HTMLButtonElement;
    let borderStyleBtn: HTMLButtonElement = document.getElementById("borderStyleBtn") as HTMLButtonElement;
    let backButton: HTMLButtonElement = document.getElementById("back") as HTMLButtonElement;
    backButton.onclick = () => {
        document.body.removeChild(pageElement);
        settingsScreen();
    }
    if(!session.fullscreenStatus){
        fullscreenBtn.innerText = "Enter Fullscreen";
    }else{
        fullscreenBtn.innerText = "Exit Fullscreen";
    }
    fullscreenBtn.onclick = () => {
        if(!session.fullscreenStatus){
            fullscreenBtn.innerText = "Exit Fullscreen";
            document.documentElement.requestFullscreen();
            session.fullscreenStatus = true;
        }else if(session.fullscreenStatus){
            fullscreenBtn.innerText = "Enter Fullscreen";
            session.fullscreenStatus = false;
            document.exitFullscreen();
        }
    }
    textSizeBtn.onclick = () => {
        document.body.removeChild(pageElement);
        textScreenSize();
    }
}

const FileImportTextSizeScreen: Promise<string> = fetch("./assets/displayAssets/TextSizeScreen.html").then(res => res.text()).catch(err => err);
let TextScreenSizeResult: string;
async function textScreenSize(){
    try{
        TextScreenSizeResult = await FileImportTextSizeScreen;
    }catch(err){
        console.error("Error Occured: " + err);
    }
    let pageElement: HTMLDivElement = document.createElement("div");
    pageElement.id = "textsizeScreen";
    pageElement.innerHTML = TextScreenSizeResult;
    document.body.appendChild(pageElement);
}

const FileImportKeybindsScreen: Promise<string> = fetch("./assets/keybindsScreen.html").then(res => res.text()).catch(err => err);
let KeybindResult: string;
async function keybindsScreen(){
    try{
        KeybindResult = await FileImportKeybindsScreen;
    }catch(err){
        console.error("Error occured" + err);
    }
}

let gameAnimationFrame: number;
let gameRender = () => {
    gameAnimationFrame = requestAnimationFrame(gameRender);
    if (!gameWindow) cancelAnimationFrame(gameAnimationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Game rendering logic goes here
    ctx.fillStyle = "black";
    ctx.fillRect(50, 50, 100, 100);
    ctx.fill();
}

const FileImportESCScreen: Promise<string> = fetch("./assets/escMenu.html").then(res => res.text()).catch(err => err);
let ESCResult: string;
let escMenuOpen: boolean = false;
async function escMenu() {
    if (!escMenuOpen) {
        escMenuOpen = true;
        try {
            ESCResult = await FileImportESCScreen;
        } catch (err) {
            err;
        }
        let pageElement: HTMLDivElement = document.createElement("div");
        pageElement.id = "escMenu";
        pageElement.innerHTML = ESCResult;
        pageElement.style.position = "absolute";
        pageElement.style.top = "0px";
        pageElement.style.left = "0px";
        pageElement.style.width = "100dvw";
        pageElement.style.height = "100dvh";
        pageElement.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        document.body.appendChild(pageElement);
        let resumeButton: HTMLButtonElement = document.getElementById("resumeBtn") as HTMLButtonElement;
        resumeButton.onclick = () => {
            escMenu();
        }
            let escSettingsButton: HTMLButtonElement = document.getElementById("settingsBtn") as HTMLButtonElement;
            escSettingsButton.onclick = () => {
                escMenu();
                document.body.removeChild(canvas);
                gameWindow = false;
                settingsScreen();
            }
            let quitButton: HTMLButtonElement = document.getElementById("mainMenuBtn") as HTMLButtonElement;
            quitButton.onclick = () => {
                escMenu();
                document.body.removeChild(canvas);
                gameWindow = false;
                titleScreen();
            }
    } else {
        escMenuOpen = false;
        let escElement: HTMLDivElement = document.getElementById("escMenu") as HTMLDivElement;
        escElement.remove();
    }
}

window.addEventListener("keydown", e => {
    switch (e.key) {
        case globalValues.gameInteraction.menu:
            if (gameWindow) escMenu();
            break;
        case "F2":
            if (globalValues.devMode) console.log("Dev Mode Active");
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
})