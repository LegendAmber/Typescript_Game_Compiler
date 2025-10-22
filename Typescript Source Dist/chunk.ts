import { chunk, terrain } from "./interface/worldInterface";

export class CreateChunk implements chunk {
    constructor(
        public positionX: number,
        public surfaceTerrain: terrain,
        public undergroundTerrain: terrain
    ){}
}