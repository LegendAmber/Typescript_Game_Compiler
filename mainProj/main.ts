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
    let title: string = "Settings";
    let pageElement: HTMLDivElement = document.createElement("div");
    pageElement.id = "settingsScreen";
    pageElement.innerHTML = SettingsResult;
    document.body.appendChild(pageElement);
}
