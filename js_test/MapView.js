(() => {

  const template = document.createElement('template');
  template.innerHTML = `
  <style>
  :host {
    position: relative;
    display: block;
    border: 1px dotted blue;
  }
  #info_layer {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 255, 0.1);
  }
  </style>
  <div id='info_layer'></div>
`;

  class OgmpMapView extends HTMLElement {

    static get observedAttributes() {
      return ['visible'];
    }

    constructor() {
      super();
      Object.defineProperty(this, 'changeFunc', {
        value: {},
        writable: false,
        enumerable: false
      });

      this.attachShadow({mode: 'open'}),
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.changeFunc.visible = this.visibleChange;
    }

    get open() {
      return this.hasAttribute('open');
    }

    set open(val) {
      if (val) {
        this.setAttribute('open', '');
      } else {
        this.removeAttribute('open');
      }
      this.toggleDraw();
    }

    get visible() {
      return this.getAttribute('visible') === 'true';
    }

    set visible(val) {
      this.setAttribute('visible', val);
    }

    toggleDraw() {
      if (this.open) {
        this.style.backgroundColor='blue';
      } else {
        this.style.backgroundColor='transparent';
      }
    }

    connectedCallback() {
      console.log('connectedCallback');
    }

    disconnectedCallback() {
      console.log('disconnectedCallback');
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name in this.changeFunc) {
        this.changeFunc[name].call(this, oldValue, newValue);
      }
    }

    visibleChange(oldVal, newVal) {
      console.log(`(change)visible : ${oldVal} -> ${newVal}`);
    }
  }

  window.customElements.define('ogmp-map', OgmpMapView);
})();
