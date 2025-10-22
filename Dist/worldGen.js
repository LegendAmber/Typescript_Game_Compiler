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
    /**
     * Creates a world instance (type)
     * @param name Name of world
     * @param timeOfDay Time world begins with
     * @param weather Weather world begins with
     * @param generatedChunks Spawn chunks
     * @param blockEntities Block entities loaded
     * @param Seed Seed of world
     * @param SpawnLimit Spawn limit of world, default: 270
     * @param spawnPoints Default spawn point for players
     */
    constructor(name, timeOfDay, weather, generatedChunks, blockEntities, Seed, SpawnLimit = 270, spawnPoints) {
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
     * Randomly generates seeds
     * @returns A number for the world seed
     */
    static generateSeed() {
        return Math.floor(Math.random() * 1000000);
    }
    /**
     * Creates a default spawnpoint
     * @param x X coordinate of Spawnpoint
     * @param y Y coordinate of Spawnpoint
     * @param chunk Spawning Chunk
     * @returns Spawnpoint
     */
    static createSpawnpoint(x, y, chunk) {
        let spawnpoint = new CreateSpawnPoint(x, y, chunk);
        return spawnpoint;
    }
    /**
     * Saves a world
     * @param worldData Data of the world
     * @param saveLocation Save location
     * @returns Status of Save
     */
    static Save(worldData, saveLocation) {
        const worldString = JSON.stringify(worldData);
        localStorage.setItem(saveLocation, worldString);
        return true;
    }
    /**
     * Loads a world
     * @param saveLocation Location of Saved data
     * @returns World Save data
     */
    static Load(saveLocation) {
        const worldString = localStorage.getItem(saveLocation);
        return JSON.parse(worldString);
    }
    /**
     * Primitive: Loads storage of worlds, and creates a button for each world.
     * @param worldsSaveData Array String containing world names
     * @param appendLocation Location where buttons are appended
     */
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
