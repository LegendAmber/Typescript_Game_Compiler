export class CreateChunk {
    positionX;
    surfaceTerrain;
    undergroundTerrain;
    constructor(positionX, surfaceTerrain, undergroundTerrain) {
        this.positionX = positionX;
        this.surfaceTerrain = surfaceTerrain;
        this.undergroundTerrain = undergroundTerrain;
    }
}
