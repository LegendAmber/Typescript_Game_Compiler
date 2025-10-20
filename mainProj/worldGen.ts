import { weatherEffect, blockEntity, chunk, world } from "./interface/worldInterface.js";

export class World implements world{
    constructor(
        public name: string,
        public timeOfDay: number,
        public weather: weatherEffect,
        public generatedChunks: chunk[],
        public blockEntities: blockEntity[],
        public Seed: number
    ){}
    /**
     * 
     * @returns A number for the world seed
     */
    static generateSeed(): number{
        return Math.floor(Math.random() * 1000000);
    }
}
export class GenerateSeed{

}