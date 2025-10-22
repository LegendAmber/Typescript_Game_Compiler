import { SpawnPoint, chunk } from "./interface/worldInterface";

export class CreateSpawnPoint implements SpawnPoint{
    constructor(public x: number,
        public y: number,
        public chunk: chunk
    ){
    }
}