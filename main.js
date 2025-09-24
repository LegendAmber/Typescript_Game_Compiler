//Imports 
import textBox from './assets/textbox.js';
//Stores Global Values of User Settings
let settingsValue = {
    volume: localStorage.getItem('volume') || 100,
    movementControls: localStorage.getItem('movementControls') || {up: 'w', down: 's', left: 'a', right: 'd'},
    devMode: localStorage.getItem('DeveloperMode') || 'false',
    fontSize: localStorage.getItem('fontSize') || '3dvh',
    borderStyle: localStorage.getItem('borderStyle') || 'double'
}


//Creates Title Screen UI
function titleScreen() {
    let title = "Arlet's Adventure";
    let pageElement = document.createElement('div');
    pageElement.id = 'title-screen';
    pageElement.innerHTML = `
        <h1 id="title-text">${title}</h1>
        <button id="start-button">Start</button>
        <button id="settings">Settings</button>
    `;
    document.body.appendChild(pageElement);
    let startButton = document.getElementById('start-button');

    startButton.onclick = function() {
        pageElement.remove();
        gameWindow();
        main();
    };
    let settingsButton = document.getElementById('settings');
    settingsButton.onclick = function() {
        pageElement.remove();
        settings();
    };
    if(settingsValue.devMode === 'true') {
        DeveloperMode();
        pageElement.remove();
    }
}
titleScreen();

function DeveloperMode() {
    let pageElement = document.createElement('div');
    pageElement.id = 'developer-screen';
    pageElement.innerHTML = `<p id="textNotifier">Dev Mode Active</p>`;
    document.body.appendChild(pageElement);
    let textNotifier = document.getElementById('textNotifier');
    textNotifier.style.color = 'green';
    textNotifier.style.fontSize = '20px';
    textNotifier.style.position = 'absolute';
    textNotifier.style.top = '0px';
    textNotifier.style.left = '0px';
    textNotifier.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
}

//Creates Setting UI
function settings () {
    let pageElement = document.createElement('div');
    pageElement.id = 'settings-screen';
    pageElement.innerHTML = `
        <h1 id="settings-text">Settings</h1>
        <label>Volume</label><input type="range" id="volume-slider" min="0" max="100" value="${settingsValue.volume}"><label id="volume-value">${settingsValue.volume} %</label><br>
        <button id="display">Display</button>
        <button id="keybinds">Keybinds</button>
        <button id="back-button">Back</button>
    `;
    document.body.appendChild(pageElement);
    let back = document.getElementById('back-button');
    back.onclick = function() {
        pageElement.remove();
        titleScreen();
    };
    let volumeSlider = document.getElementById('volume-slider');
    volumeSlider.oninput = () => {
        let volumeValue = document.getElementById('volume-value');
        volumeValue.innerText = volumeSlider.value + " %";
        localStorage.setItem('volume', volumeSlider.value);
    }
    let displayButton = document.getElementById('display');
    displayButton.onclick = () => {
        pageElement.remove();
        display();
    };
    let display = () => {
        let pageElement = document.createElement('div');
        pageElement.id = 'display-screen';
        pageElement.innerHTML = `
            <h1 id="display-text">Display</h1>
            <button id="fullscreen">Enter Fullscreen</button>
            <button id="font-size">Font Size</button>
            <button id="border-style">Border Style</button>
            <button id="back-button">Back</button>
        `;
        document.body.appendChild(pageElement);
        let back = document.getElementById('back-button');
        back.onclick = function() {
            pageElement.remove();
            settings();
        };
        let fullscreenButton = document.getElementById('fullscreen');
        fullscreenButton.onclick = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                fullscreenButton.innerText = "Exit Fullscreen";
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                    fullscreenButton.innerText = "Enter Fullscreen";
                }
            }
        };
        let fontSize = document.getElementById('font-size');
        fontSize.onclick = () => {
            pageElement.remove();
            fontSizeSettings();
            }
        let fontSizeSettings = () => {
            let pageElement = document.createElement('div');
            pageElement.id = 'font-size-screen';
            pageElement.innerHTML = `
                <h1 id="font-size-text">Font Size</h1>
                <label>Font Size</label><label id="font-size-value">${settingsValue.fontSize}</label><br>
                <button id="back-button">Back</button>
            `;
        }
    let keybindsButton = document.getElementById('keybinds');
    keybindsButton.onclick = () => {
        pageElement.remove();
        keybinds();
    };
    let keybinds = () => {
        let pageElement = document.createElement('div');
        pageElement.id = 'keybinds-screen';
        pageElement.innerHTML = `
            <h1 id="keybinds-text">Keybinds</h1>
            <button id="back-button">Back</button>
        `;
        document.body.appendChild(pageElement);
        let back = document.getElementById('back-button');
        back.onclick = function() {
            pageElement.remove();
            settings();
        }
    }
}
}

//Main Loop for Animation
let main = () => {
    requestAnimationFrame(main);
    const canvas = document.getElementById('game-window');
    canvas.style.opacity = '1';
    const ctx = canvas.getContext('2d');
    //Corrects resizing for canvas
    if ( canvas.width != window.innerWidth || canvas.height != window.innerHeight ) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

}

//Creates Game Window
let gameWindow = () => {
    let canvas = document.createElement('canvas');
    canvas.id = 'game-window';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.opacity = '0';
    canvas.style.backgroundColor = 'black';
    document.body.appendChild(canvas);
}

//Keybind global event listener
document.addEventListener('keydown', event => {
    let tempVars = {
        pageConfig: 'title-screen'
    }
    switch(event.key) {
        case settingsValue.movementControls.up:
            console.log('up');
            break;
        case settingsValue.movementControls.down:
            console.log('down');
            break;
        case settingsValue.movementControls.left:
            console.log('left');
            break;
        case settingsValue.movementControls.right:
            console.log('right');
            break;
        case 'F4':
            if (settingsValue.devMode === 'false') {
                console.log('Developer Mode Activated');
                settingsValue.devMode = 'true';
                DeveloperMode();
                tempVars.pageConfig = document.querySelector('div').id;
                document.getElementById(tempVars.pageConfig).remove();
                localStorage.setItem('DeveloperMode', 'true');
            }else if(settingsValue.devMode === 'true') {
                console.log('Developer Mode Deactivated');
                settingsValue.devMode = 'false';
                let devScreen = document.getElementById('developer-screen');
                localStorage.setItem('DeveloperMode', 'false');
                devScreen.remove();
                titleScreen();
                }
                break;
            default:
                break;
            }
    }
);