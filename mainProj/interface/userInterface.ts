interface StorageValues {
    volume: number;
    gameInteraction: {
        left: string, right: string, up: string, down: string, jump: string,
        interact: string, inventory: string, menu: string
    };
    devMode: boolean;
    fontSize: string;
    borderStyle: string;
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

interface SessionValues {
    fullscreenStatus: boolean;
}



export { StorageValues, Player, SessionValues };