export class World {
    name;
    timeOfDay;
    weather;
    generatedChunks;
    blockEntities;
    constructor(name, timeOfDay, weather, generatedChunks, blockEntities) {
        this.name = name;
        this.timeOfDay = timeOfDay;
        this.weather = weather;
        this.generatedChunks = generatedChunks;
        this.blockEntities = blockEntities;
    }
}
