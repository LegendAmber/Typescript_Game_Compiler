import { weatherEffect, blockEntity, chunk, world, SpawnPoint } from "./interface/worldInterface.js";
import { CreateSpawnPoint } from "./spawnPoint.js";
export class World implements world{
    constructor(
        public name: string,
        public timeOfDay: number,
        public weather: weatherEffect,
        public generatedChunks: chunk[],
        public blockEntities: blockEntity[],
        public Seed: number,
        public SpawnLimit: number,
        public spawnPoints: SpawnPoint[]
    ){}
    /**
     * 
     * @returns A number for the world seed
     */
    static generateSeed(): number{
        return Math.floor(Math.random() * 1000000);
    }
    static createSpawnpointDefault(x: number, y: number, chunk: chunk): SpawnPoint{
        let spawnpoint: SpawnPoint = new CreateSpawnPoint(x, y, chunk);
        return spawnpoint;
    }
}