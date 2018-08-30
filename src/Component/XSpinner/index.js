import css from './spinner.css';
const CSS = css.toString();
import html from './spinner.html';

export default class XSpinner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = html;
        this._style = document.createElement('style');
        this._style.innerHTML = CSS;
        this.shadowRoot.prepend(this._style);

    }

}

window.customElements.define('x-spinner', XSpinner);
