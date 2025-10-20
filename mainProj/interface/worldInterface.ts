interface weatherEffect{
    type: string;
    timer?: number;
}

interface terrain{
    type: string;
    transition?: boolean;
}

interface item{
    name: string;
    amount: number;
}

interface blockEntity{
    id: string;
    contents: [item];
}

interface chunk{
    positionX: number; //Based on location in world grid
    surfaceTerrain: terrain;
    undergroundTerrain: terrain;
}

interface world{
    name: string;
    timeOfDay: number; //0-2400 represents time (00:00 - 24:00)
    weather: weatherEffect;
    generatedChunks: chunk[];
    blockEntities: blockEntity[];
}
export {weatherEffect, terrain, item, blockEntity, chunk, world};