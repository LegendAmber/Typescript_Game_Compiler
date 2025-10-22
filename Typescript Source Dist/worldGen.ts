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
    }static SaveWorld(worldData: world, saveLocation: string): boolean{
        const worldString = JSON.stringify(worldData);
        localStorage.setItem(saveLocation, worldString);
        return true;
    }static LoadWorld(saveLocation: string): world{
        const worldString = localStorage.getItem(saveLocation) as string;
        return JSON.parse(worldString) as world;
    }static CreateSelectors(worldsSaveData: string[], appendLocation: HTMLDivElement){
        for(let i: number = 0; i < worldsSaveData.length; i++){
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