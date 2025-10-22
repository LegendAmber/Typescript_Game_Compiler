import { CreateSpawnPoint } from "./spawnPoint.js";
export class World {
    name;
    timeOfDay;
    weather;
    generatedChunks;
    blockEntities;
    Seed;
    SpawnLimit;
    spawnPoints;
    constructor(name, timeOfDay, weather, generatedChunks, blockEntities, Seed, SpawnLimit, spawnPoints) {
        this.name = name;
        this.timeOfDay = timeOfDay;
        this.weather = weather;
        this.generatedChunks = generatedChunks;
        this.blockEntities = blockEntities;
        this.Seed = Seed;
        this.SpawnLimit = SpawnLimit;
        this.spawnPoints = spawnPoints;
    }
    /**
     *
     * @returns A number for the world seed
     */
    static generateSeed() {
        return Math.floor(Math.random() * 1000000);
    }
    static createSpawnpointDefault(x, y, chunk) {
        let spawnpoint = new CreateSpawnPoint(x, y, chunk);
        return spawnpoint;
    }
    static SaveWorld(worldData, saveLocation) {
        const worldString = JSON.stringify(worldData);
        localStorage.setItem(saveLocation, worldString);
        return true;
    }
    static LoadWorld(saveLocation) {
        const worldString = localStorage.getItem(saveLocation);
        return JSON.parse(worldString);
    }
    static CreateSelectors(worldsSaveData, appendLocation) {
        for (let i = 0; i < worldsSaveData.length; i++) {
            let button = document.createElement("button");
            let br = document.createElement("hr");
            button.setAttribute('location', `${i}`);
            button.innerText = worldsSaveData[i];
            button.id = worldsSaveData[i];
            appendLocation.appendChild(button);
            appendLocation.appendChild(br);
        }
    }
}
