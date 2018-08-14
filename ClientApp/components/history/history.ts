import * as ko from 'knockout';
import * as Plottable from 'plottable';

alert("Before");


class HistoryViewModel {

    constructor() {

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
    
      let chart = new Plottable.Components.Table([
        [yAxis, plot],
        [null, xAxis]
      ]);

        alert("div#tutorial-result: " + JSON.stringify(document.querySelector("div#tutorial-result")));

        chart.renderTo("div#tutorial-result");


        alert("Here3");

    }
}

export default { viewModel: HistoryViewModel,
                 template: require('./history.html') };
