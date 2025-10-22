import { StorageValues } from "./interface/userInterface.js";
import { world } from "./interface/worldInterface.js";
/**
 * 
 * @param data Any StorageValues variable
 * @param storageArea Storage area
 * @returns Status of request
 */

let SaveState = (data: StorageValues|world, storageArea: string) => {
    const jsondata = JSON.stringify(data);
    localStorage.setItem(storageArea, jsondata);
    return true;
}
/**
 * 
 * @param storageArea Name where stored data is
 * @returns Returns StorageState of the save state
 */

let loadState = (storageArea: string)=> {
    const storedData: string = localStorage.getItem(storageArea) as string;
        return JSON.parse(storedData) as StorageValues;
}
/**
 * 
 * @param data Any String[] values
 * @param storageArea Storage area
 * @returns Status of request
 */
let SaveArrayString = (data: string[], storageArea: string) => {
    const StorageItems = JSON.stringify(data);
    localStorage.setItem(storageArea, StorageItems);
    return true;
}

let LoadArrayString = (storageArea: string) => {
    const storedData: string = localStorage.getItem(storageArea) as string;
    return JSON.parse(storedData) as string[];
}
export { SaveState, loadState, SaveArrayString, LoadArrayString };