export class World {
    name;
    timeOfDay;
    weather;
    generatedChunks;
    blockEntities;
    Seed;
    constructor(name, timeOfDay, weather, generatedChunks, blockEntities, Seed) {
        this.name = name;
        this.timeOfDay = timeOfDay;
        this.weather = weather;
        this.generatedChunks = generatedChunks;
        this.blockEntities = blockEntities;
        this.Seed = Seed;
    }
    /**
     *
     * @returns A number for the world seed
     */
    static generateSeed() {
        return Math.floor(Math.random() * 1000000);
    }
}
export class GenerateSeed {
}
