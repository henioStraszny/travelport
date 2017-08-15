class AirportSelector extends HTMLElement {

    static get observedAttributes() {
        return ['placeholder'];
    }
    get placeholder() {
        return this.input.placeholder;
    }
    set placeholder(val) {
        console(this);
        if (val) {
            console(this);
            console(this.input);
            this.input.setAttribute('placeholder', val);
        }
        else {
            this.input.removeAttribute('placeholder');
        }
    }

    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
            <input id="airport-from" class="awesomplete" />
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
            })
        });
    }
}

window.customElements.define('airport-selector', AirportSelector);