import { World } from "../worldGen";
import { CreateChunk } from "../chunk";
import * as Types from "../interface/constsInterface";
import {world} from "../interface/worldInterface";
import { SaveArrayString, LoadArrayString } from "../dataHandling";
import { HTMLImport } from "../htmlImport";
import { GameWindow } from "../game";

//Generates a new world named Example world
let newWorld: world = new World("Example world", 0, {type: "clear"}, [new CreateChunk(1, {type: Types.TERRAIN_TYPE_ANTI_GRAVITY}, {type: Types.TERRAIN_TYPE_DEFAULT_UNDERGROUND})], [], World.generateSeed(), 270, []);

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

//Creating a game window
let window = new GameWindow();

//Create animation 
window.StartAnimation(main);
//Function used for "callback"
function main(){
    //Clear canvas
    window.ClearWindow();
    //Put pen down first
    window.PenDown(0, 0);

    //Draw a line, intial points are where the pen was put down
    window.LineTo(20, 0);

    //Draw a rectangle (Draws a filled rectangle)
    window.DrawRectangle(1, 1, 20, 20, Types.RECTANGLE_TYPE_FILL);

    //Draw a circle
    //Math.PI is recommended to create a normal sized circle, scaled
    window.DrawCircle(1, 1, Math.PI);

    //Stops drawing sequence
    window.PenUp();
}