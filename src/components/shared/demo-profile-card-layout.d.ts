declare class DemoProfileCardLayout extends HTMLElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(): void;
    private getAttr;
    private render;
}

export {};
