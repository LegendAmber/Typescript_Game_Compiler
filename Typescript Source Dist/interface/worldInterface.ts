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

interface SpawnPoint{
    x: number;
    y: number;
    chunk: chunk;
}

interface world{
    name: string;
    timeOfDay: number; //0-2400 represents time (00:00 - 24:00)
    weather: weatherEffect;
    generatedChunks: chunk[];
    blockEntities: blockEntity[];
    Seed: number;
    SpawnLimit: number;
    spawnPoints: SpawnPoint[];
}
export const TERRAIN_TYPE_SNOW = "snow", TERRAIN_TYPE_SAND = "sand", TERRAIN_TYPE_GRASS = "grass", TERRAIN_TYPE_JUNGLE = "jungle", TERRAIN_TYPE_BEACH = "beach", TERRAIN_TYPE_SKY = "sky", TERRAIN_TYPE_DEFAULT_UNDERGROUND = "defunderground", TERRAIN_TYPE_HELL = "hell", TERRAIN_TYPE_GEM = "gem", TERRAIN_TYPE_ANTI_GRAVITY = "anti-grav";

export {weatherEffect, terrain, item, blockEntity, chunk, world, SpawnPoint};