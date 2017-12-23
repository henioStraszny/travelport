class FlightSearch extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <airport-selector id="airport-from" placeholder="From"></airport-selector>
            <airport-selector id="airport-to" placeholder="To"></airport-selector>
            <button id="search-button" type="button" ">Find</button>
            <ul id="results"></ul>
            <table id="flights-table">
            </table>
        `
        this.children.namedItem
        var button = this.getElementsByTagName('button')[0];
        button.addEventListener("click", () => {
            var airportFrom = this.children.namedItem('airport-from');
            var airportTo = this.children.namedItem('airport-to');
            var table = this.children.namedItem('flights-table');
            var button = this.children.namedItem('search-button');
            button.disabled = true;
            if (!airportFrom.airport || !airportTo.airport ||
                airportFrom.airport == airportTo.airport) return;
            $.ajax({
                url: "http://localhost:3000/flight_search?date=2017-10-11&from="
                + airportFrom.airport + "&to=" + airportTo.airport,
            }).done(function (data) {
                table.innerHTML = '';
                var row = table.insertRow();
                var cell1 = row.insertCell();
                var cell2 = row.insertCell();
                var cell3 = row.insertCell();
                var cell4 = row.insertCell();
                cell1.outerHTML = `<th>Line</th>`;
                cell2.outerHTML = `<th>Start</th>`;
                cell3.outerHTML = `<th>Land</th>`;
                cell4.outerHTML = `<th>Price</th>`;

                for (var i = 0; i < data.length; i++) {
                    var element = data[i];
                    var row = table.insertRow();
                    var cell1 = row.insertCell();
                    var cell2 = row.insertCell();
                    var cell3 = row.insertCell();
                    var cell4 = row.insertCell();
                    cell1.innerHTML = element.Airline;
                    cell2.innerHTML = element.StartDate;
                    cell3.innerHTML = element.FinishDate;
                    cell4.innerHTML = element.Price;
                }   
                button.disabled = false;                
            });
        });

    }

    insertRow(table, array){
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            var row = table.insertRow();
            var cell = row.insertCell();
            cell.innerHTML = array[i];
        }
    }
}

window.customElements.define('flight-search', FlightSearch);