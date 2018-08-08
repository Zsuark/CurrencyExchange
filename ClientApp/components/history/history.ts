import * as ko from 'knockout';


interface CurrencyRate {
    date: string;
    currency: number;
    rate: number;
}



class HistoryViewModel {
    public currentCount = ko.observable(0);


    public incrementCounter() {
        let prevCount = this.currentCount();
        this.currentCount(prevCount + 1);
    }

    public latestRates = ko.observableArray<CurrencyRate>();

    constructor() {
        fetch('api/Currency/LatestRates')
            .then(response => response.json() as Promise<CurrencyRate[]>)
            .then(data => {
                this.latestRates(data);
            });
    }

}

export default { viewModel: HistoryViewModel,
                 template: require('./history.html') };
