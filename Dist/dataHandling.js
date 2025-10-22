/**
 *
 * @param data Any StorageValues variable
 * @param storageArea Storage area
 * @returns Status of request
 */
let SaveState = (data, storageArea) => {
    const jsondata = JSON.stringify(data);
    localStorage.setItem(storageArea, jsondata);
    return true;
};
/**
 *
 * @param storageArea Name where stored data is
 * @returns Returns StorageState of the save state
 */
let loadState = (storageArea) => {
    const storedData = localStorage.getItem(storageArea);
    return JSON.parse(storedData);
};
/**
 *
 * @param data Any String[] values
 * @param storageArea Storage area
 * @returns Status of request
 */
let SaveArrayString = (data, storageArea) => {
    const StorageItems = JSON.stringify(data);
    localStorage.setItem(storageArea, StorageItems);
    return true;
};
let LoadArrayString = (storageArea) => {
    const storedData = localStorage.getItem(storageArea);
    return JSON.parse(storedData);
};
export { SaveState, loadState, SaveArrayString, LoadArrayString };
