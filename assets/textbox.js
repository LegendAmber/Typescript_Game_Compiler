export default class main {
    /**
     * Generates a text box with the provided HTML string.
     * @param {HTMLElement} HTMLString
     * @param {Style} borderStyle
     * @param {Color} borderColor
     */
    createText(HTMLString, borderStyle, borderColor, fontSize){
        let textElement = document.createElement('div');
        textElement.id = 'text-box';
        textElement.innerHTML = `${HTMLString || 'HTML not provided'} <br><br><button id="continue">></button>`;
        document.body.appendChild(textElement);
        textElement.style.border = `.75dvh ${borderStyle || 'solid'} ${borderColor || 'black'}`;
        textElement.style.fontSize = fontSize || '3dvh';
    }
}