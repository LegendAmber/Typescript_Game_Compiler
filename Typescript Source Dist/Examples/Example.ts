import { World } from "../worldGen";
import { CreateChunk } from "../chunk";
import * as TerrainTypes from "../interface/constsInterface";
import {world} from "../interface/worldInterface";
import { SaveArrayString, LoadArrayString } from "../dataHandling";
import { HTMLImport } from "../htmlImport";

//Generates a new world named Example world
let newWorld: world = new World("Example world", 0, {type: "clear"}, [new CreateChunk(1, {type: TerrainTypes.TERRAIN_TYPE_ANTI_GRAVITY}, {type: TerrainTypes.TERRAIN_TYPE_DEFAULT_UNDERGROUND})], [], World.generateSeed(), 270, []);

//To save world use World.Save()
//World is currently saved as JSON under the name of "Example world"
World.Save(newWorld, newWorld.name);

//To load a world use World.Load()
World.Load(newWorld.name);

//To generate seeds use World.generateSeed()
World.generateSeed();

//Worlds are stored by strings within an array
//To save a world string list, use SaveArrayString()
SaveArrayString(["example1"], "worldSaves");

//To load world string lists, use LoadArrayString()
LoadArrayString("worldSaves");

//To import an HTML file, you can use HTMLImport
let div: HTMLDivElement = document.createElement("div");
let ExampleHTMLDoc = new HTMLImport("./example.html", div);