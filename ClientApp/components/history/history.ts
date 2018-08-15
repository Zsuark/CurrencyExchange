import * as ko from 'knockout';
import * as Plottable from 'plottable';

// TODO: Remove code duplication for CurrencyRate
interface CurrencyRate {
    date: string;
    currency: string;
    rate: number;
}

class HistoryViewModel {

    constructor() {

      let yScale = new Plottable.Scales.Linear();
    

      let xScale = new Plottable.Scales.Time();
      let xAxis: Plottable.Axes.Time = new Plottable.Axes.Time(xScale, "bottom");
      let configs = xAxis.axisConfigurations();

      

      let newConfigs: Plottable.Axes.TimeAxisConfiguration[] = [];
      configs.forEach(function(tierConfiguration){
        let newTierConfiguration: Plottable.Axes.TimeAxisTierConfiguration[] = [];
        tierConfiguration.forEach(function(row){
            if(row.interval === "day" ||
                row.interval === "month" ||
                row.interval === "year"){
                newTierConfiguration.push(row);
            }
        });
        newConfigs.push(newTierConfiguration);
      });
      xAxis.axisConfigurations(newConfigs);


      let yAxis: Plottable.Axes.Numeric = new Plottable.Axes.Numeric(yScale, "left");


      let plot: Plottable.Plots.Line<{}> = new Plottable.Plots.Line();
        plot.x(function(d) { 
            let xDate = new Date(d.date);
            console.log("new date:  " + xDate + ", for d: " + JSON.stringify(d));
            return xDate;
        }, xScale);
      plot.y(function(d) { return d.rate; }, yScale);
    

        fetch('api/Currency/AllRatesHistory')
            .then(response => response.json() as Promise<CurrencyRate[]>)
            .then(data => {
                console.log("+=+=+=+=+=+=+=+=+=+=+ DATA: " + JSON.stringify(data));

               
                let dataset: Plottable.Dataset = new Plottable.Dataset(data);
                plot.addDataset(dataset);
                
                let chart: Plottable.Components.Table = new Plottable.Components.Table([
                  [yAxis, plot],
                  [null, xAxis]
                ]);
                
                /* */
                chart.renderTo("div#rate-chart");
                /* */
            });

    }
}

export default { viewModel: HistoryViewModel,
                 template: require('./history.html') };
