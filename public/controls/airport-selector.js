class AirportSelector extends HTMLElement {
    static get observedAttributes() {
        return ['placeholder', 'airport'];
    }

    get airport() {
        return this._airport;
    }
    get placeholder() {
        return this._placeholder;
    }
    set airport(val) {
        if (val) {
            this.input.setAttribute('airport', val);
        }
        else {
            this.input.removeAttribute('airport');
        }
    }
    set placeholder(val) {
        if (val) {
            this.input.setAttribute('placeholder', val);
        }
        else {
            this.input.removeAttribute('placeholder');
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name == "placeholder") this._placeholder = newValue;
        if(name == "airport") this._airport = newValue;
    }

    constructor() {
        super();
        this._placeholder = null;
        this._airport = null;
        this._connected = false;
    }

    connectedCallback() {
        //Prevent multiple dom initialization
        if(this._connected == true) return;
        this._connected = true;

        this.innerHTML = `
            <input id="airport-from" class="awesomplete" placeholder="${this._placeholder}"/>
        `;
        var awescomplete = new Awesomplete(this.getElementsByTagName('input')[0]);
        this.addEventListener("input", function () {
            if (awescomplete.input.value.length < 2) return;
            $.ajax({
                url: "http://localhost:3000/airports?q=" + awescomplete.input.value,
            }).done(function (data) {
                let list = data.map(function (i) {
                    return {
                        label: i.City + " " + i.Code + " " + i.Country,
                        value: i.Code
                    }
                });
                awescomplete.list = list;
            });
        });
        this.addEventListener("awesomplete-selectcomplete", function(val){
            this._airport = this.getElementsByTagName('input')[0].value;
        });
    }
}

window.customElements.define('airport-selector', AirportSelector);