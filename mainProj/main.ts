interface SettingsValue{
volume: number;
movementControls: {};
devMode: boolean;
fontSize: number;
borderStyle: string;
fullscreen: boolean;
textboxColorScheme: string;
}

let globalValues: SettingsValue = {
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
}

let canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

let TitleResult: string;
const FileImportTitleScreen: Promise<string> = fetch("./assets/titleScreen.html").then(res => res.text()).catch(err => err);
titleScreen();
async function titleScreen(){
    try {
      TitleResult = await FileImportTitleScreen;
    }catch(err){
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
    }
    settingsButton.onclick = () => {
        document.body.removeChild(pageElement);
        settingsScreen();
    }
}

const FileImportSettingsScreen: Promise<string> = fetch("./assets/settingsScreen.html").then(res => res.text()).catch(err => err);
let SettingsResult: string;
async function settingsScreen(){
    try{
        SettingsResult = await FileImportSettingsScreen;
    }catch(err){
        err;
    }
    let pageElement: HTMLDivElement = document.createElement("div");
    pageElement.id = "settingsScreen";
    pageElement.innerHTML = SettingsResult;
    document.body.appendChild(pageElement);
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
async function displayScreen(){
    try{
        DisplayResult = await FileImportDisplayScreen;
    }catch(err){
        err;
    }
    let pageElement: HTMLDivElement = document.createElement("div");
    pageElement.id = "displayScreen";
    pageElement.innerHTML = DisplayResult;
    document.body.appendChild(pageElement);
    let backButton: HTMLButtonElement = document.getElementById("back") as HTMLButtonElement;
    backButton.onclick = () => {
        document.body.removeChild(pageElement);
        settingsScreen();
    }
}

let gameWindow: boolean = false;
let gameRender = () => {
    if(!gameWindow) gameWindow = true;
    requestAnimationFrame(gameRender);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Game rendering logic goes here
    ctx.fillStyle = "black";
    ctx.fillRect(50, 50, 100, 100);
    ctx.fill();
}

const FileImportESCScreen: Promise<string> = fetch("./assets/escMenu.html").then(res => res.text()).catch(err => err);
let ESCResult: string;
let escMenuOpen: boolean = false;
async function escMenu(){
    if(!escMenuOpen){
        escMenuOpen = true;
        try{
            ESCResult = await FileImportESCScreen;
        }catch(err){
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
    }else{
        escMenuOpen = false;
        let escElement: HTMLDivElement = document.getElementById("escMenu") as HTMLDivElement;
        escElement.remove();
    }
    let resumeButton: HTMLButtonElement = document.getElementById("resumeBtn") as HTMLButtonElement;
    resumeButton.onclick = () => {
        escMenu();
    }
    let escSettingsButton: HTMLButtonElement = document.getElementById("settingsBtn") as HTMLButtonElement;
    escSettingsButton.onclick = () => {
        escMenu();
        document.body.removeChild(canvas);
        settingsScreen();
    }
    let quitButton: HTMLButtonElement = document.getElementById("mainMenuBtn") as HTMLButtonElement;
    quitButton.onclick = () => {
        escMenu();
        document.body.removeChild(canvas);
        titleScreen();
    }
}

window.addEventListener("keydown", e => {
    console.log(e.key); 
    if(e.key === "Escape" && gameWindow){
        escMenu();
    }
});