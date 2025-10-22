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
}
