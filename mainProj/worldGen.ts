import { weatherEffect, blockEntity, chunk, world } from "./interface/worldInterface.js";

export class World implements world{
    constructor(
        public name: string,
        public timeOfDay: number,
        public weather: weatherEffect,
        public generatedChunks: chunk[],
        public blockEntities: blockEntity[]
    ){}
}