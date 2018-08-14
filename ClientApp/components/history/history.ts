import * as ko from 'knockout';
import * as Plottable from 'plottable';


class HistoryViewModel {

    constructor() {

      let xScale = new Plottable.Scales.Linear();
      let yScale = new Plottable.Scales.Linear();
    
      let xAxis: Plottable.Axes.Numeric = new Plottable.Axes.Numeric(xScale, "bottom");
      let yAxis: Plottable.Axes.Numeric = new Plottable.Axes.Numeric(yScale, "left");
    
      let plot: Plottable.Plots.Line<{}> = new Plottable.Plots.Line();
      plot.x(function(d) { return d.x; }, xScale);
      plot.y(function(d) { return d.y; }, yScale);
    
      let data = [
        { "x": 0, "y": 1 },
        { "x": 1, "y": 2 },
        { "x": 2, "y": 4 },
        { "x": 3, "y": 8 }
      ];
    
      let dataset: Plottable.Dataset = new Plottable.Dataset(data);
      plot.addDataset(dataset);
    
      let chart: Plottable.Components.Table = new Plottable.Components.Table([
        [yAxis, plot],
        [null, xAxis]
      ]);

        chart.renderTo("div#tutorial-result");


    }
}

export default { viewModel: HistoryViewModel,
                 template: require('./history.html') };
