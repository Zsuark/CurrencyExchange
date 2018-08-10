import * as ko from 'knockout';
import * as Rickshaw from 'rickshaw';

/*
These helped!

 - https://stackoverflow.com/questions/49267769/typescript-index-d-ts-declaration-for-deeply-nested-function-in-an-npm-packagefdsa


*/


class HistoryViewModel {
    public currentCount = ko.observable(0);

    private latestRates = ko.observableArray<CurrencyRate>();



    public incrementCounter() {
        let prevCount = this.currentCount();
        this.currentCount(prevCount + 1);
    }

    private getLatestRates() {
        fetch('api/Currency/LatestRates')
            .then(response => response.json() as Promise<CurrencyRate[]>)
            .then(data => {
                this.latestRates(data);
            });
    }

    constructor() {
        var chart = new Rickshaw.Graph( {
            element: document.querySelector("#chart"), 
            width: 500, 
            height: 200, 
            series: [{
                color: 'steelblue',
                data: [ 
                    { x: 0, y: 40 }, 
                    { x: 1, y: 49 }, 
                    { x: 2, y: 38 }, 
                    { x: 3, y: 30 }, 
                    { x: 4, y: 32 } ]
            }]
        });
    
        chart.render();

    }

}


    /*

    public latestRates = ko.observableArray<CurrencyRate>();

    constructor() {
        fetch('api/Currency/LatestRates')
            .then(response => response.json() as Promise<CurrencyRate[]>)
            .then(data => {
                this.latestRates(data);
            });
            }

*/


export default { viewModel: HistoryViewModel,
                 template: require('./history.html') }; /*,
                 afterRender:   HistoryViewModel.drawChart }; */

