import *    as ko       from 'knockout';
import { CurrencyRate } from '../../interfaces/CurrencyRate';

/*
These helped/help!

 - https://stackoverflow.com/questions/49267769/typescript-index-d-ts-declaration-for-deeply-nested-function-in-an-npm-packagefdsa
 - https://stackoverflow.com/questions/13300137/how-to-edit-a-node-module-installed-via-npm
 - https://stackoverflow.com/questions/8243527/use-git-dependencies-with-npm-and-node-on-heroku/8306715#8306715

*/




class HistoryViewModel {
    private latestRates = ko.observableArray<CurrencyRate>();
    // private 

//    private drawChart() {
  //  }

 
    constructor() {
        fetch('api/Currency/LatestRates')
            .then(response => response.json() as Promise<CurrencyRate[]>)
            .then(data => {
                this.latestRates(data);
                });

        // this.drawChart();
        
    }
}

export default { viewModel: HistoryViewModel,
                 template: require('./history.html') };


        /*
        let chartElement = <HTMLElement>document.querySelector("#chart");


        let graph = new Rickshaw.Graph( {
            element: chartElement, // document.querySelector("#chart"),
            width: 550,
            height: 250,
            series: [
                    {
                            name: "Northeast",
                            data: [ { x: -1893456000, y: 25868573 }, { x: -1577923200, y: 29662053 }, { x: -1262304000, y: 34427091 }, { x: -946771200, y: 35976777 }, { x: -631152000, y: 39477986 }, { x: -315619200, y: 44677819 }, { x: 0, y: 49040703 }, { x: 315532800, y: 49135283 }, { x: 631152000, y: 50809229 }, { x: 946684800, y: 53594378 }, { x: 1262304000, y: 55317240 } ],
                            color: palette.color()
                    },
                    {
                            name: "Midwest",
                            data: [ { x: -1893456000, y: 29888542 }, { x: -1577923200, y: 34019792 }, { x: -1262304000, y: 38594100 }, { x: -946771200, y: 40143332 }, { x: -631152000, y: 44460762 }, { x: -315619200, y: 51619139 }, { x: 0, y: 56571663 }, { x: 315532800, y: 58865670 }, { x: 631152000, y: 59668632 }, { x: 946684800, y: 64392776 }, { x: 1262304000, y: 66927001 } ],
                            color: palette.color()
                    },
                    {
                            name: "South",
                            data: [ { x: -1893456000, y: 29389330 }, { x: -1577923200, y: 33125803 }, { x: -1262304000, y: 37857633 }, { x: -946771200, y: 41665901 }, { x: -631152000, y: 47197088 }, { x: -315619200, y: 54973113 }, { x: 0, y: 62795367 }, { x: 315532800, y: 75372362 }, { x: 631152000, y: 85445930 }, { x: 946684800, y: 100236820 }, { x: 1262304000, y: 114555744 } ],
                            color: palette.color()
                    },
                    {
                            name: "West",
                            data: [ { x: -1893456000, y: 7082086 }, { x: -1577923200, y: 9213920 }, { x: -1262304000, y: 12323836 }, { x: -946771200, y: 14379119 }, { x: -631152000, y: 20189962 }, { x: -315619200, y: 28053104 }, { x: 0, y: 34804193 }, { x: 315532800, y: 43172490 }, { x: 631152000, y: 52786082 }, { x: 946684800, y: 63197932 }, { x: 1262304000, y: 71945553 } ],
                            color: palette.color()
                    }
            ]
        } );    
    
        var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );

        var y_axis = new Rickshaw.Graph.`.Y( {
                graph: graph,
                orientation: 'left',
                tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                element: document.getElementById('y_axis'),
        } );
        
        var legend = new Rickshaw.Graph.Legend( {
                element: document.querySelector('#legend'),
                graph: graph
        } );
        
        graph.render();
    }

    */


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


// export default { viewModel: HistoryViewModel,
//                  template: require('./history.html') }; /*,
                 // afterRender:   HistoryViewModel.drawChart }; */

