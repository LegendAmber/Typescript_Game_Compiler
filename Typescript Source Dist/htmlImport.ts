export class HTMLImport {
    /**
     * Opens select HTML element and appends it to chosen div
     * @param fileLocation File location of the HTML file
     * @param AppendElement HTML element to append HTML file
     */
    constructor(fileLocation: string, AppendElement: HTMLDivElement){
        const FileLocal:Promise<string> = fetch(fileLocation).then(res => res.text()).catch(err => err);
        let FileContent: string;
        async function tempFunc(){
            try{
                FileContent = await FileLocal;
            }catch{
                console.error("Error has occured");
            }
            AppendElement.innerHTML = FileContent;
        }
        tempFunc();
    }
}