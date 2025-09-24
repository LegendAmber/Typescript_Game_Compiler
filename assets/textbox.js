export default class main {
    /**
     * Generates a text box with the provided HTML string.
     * @param {HTMLElement} HTMLString
     */
    createText(HTMLString){
        let textElement = document.createElement('div');
        textElement.id = 'text-box';
        textElement.innerHTML = `${HTMLString || 'HTML not provided'} <br><br><button id="continue">></button>`;
        document.body.appendChild(textElement);
    }
}