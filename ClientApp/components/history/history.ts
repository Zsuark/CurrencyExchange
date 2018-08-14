import * as ko from 'knockout';
// import * as Plottable from 'plottable';
// import { CurrencyRate } from '../../interfaces/CurrencyRate';

/*
These helped/help!

 - https://stackoverflow.com/questions/49267769/typescript-index-d-ts-declaration-for-deeply-nested-function-in-an-npm-packagefdsa
 - https://stackoverflow.com/questions/13300137/how-to-edit-a-node-module-installed-via-npm
 - https://stackoverflow.com/questions/8243527/use-git-dependencies-with-npm-and-node-on-heroku/8306715#8306715

*/


alert("Starting up....");

class HistoryViewModel {
    // private latestRates = ko.observableArray<CurrencyRate>();

 
    constructor() {
        // fetch('api/Currency/LatestRates')
        //     .then(response => response.json() as Promise<CurrencyRate[]>)
        //     .then(data => {
        //         this.latestRates(data);
        //         });
        alert("Hey there!");

        /*
        let xScale = new Plottable.Scales.Linear();
        let yScale = new Plottable.Scales.Linear();

        let xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
        let yAxis = new Plottable.Axes.Numeric(yScale, "left");
        let plot = new Plottable.Plots.Line();

        plot.x(function(d) { return d.x; }, xScale);
        plot.y(function(d) { return d.y; }, yScale);

        let data = [
            { "x": 0, "y": 1 },
            { "x": 1, "y": 2 },
            { "x": 2, "y": 4 },
            { "x": 3, "y": 8 }
        ];

        let dataset = new Plottable.Dataset(data);

        plot.addDataset(dataset);

        var chart = new Plottable.Components.Table([
            [yAxis, plot],
            [null, xAxis]
        ]);

        chart.renderTo("svg#chart");

        */

    }
}

export default { viewModel: HistoryViewModel,
                 template: require('./history.html') };




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

