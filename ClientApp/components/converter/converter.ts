import * as ko from 'knockout';

interface CurrencyRate {
    date: string;
    currency: number;
    rate: number;
}

class ConverterViewModel {
    public rates = ko.observableArray<CurrencyRate>();


    public from_amount = ko.observable<number>();

    public currency_from = ko.observable<CurrencyRate>();
    public currency_to = ko.observable<CurrencyRate>();

    public rates_date = ko.observable<string>();

    public to_amount   = ko.computed<number | string | null>(() => {

        let fromAmount = this.from_amount();
        let fromCurrencyObj = this.currency_from();
        let toCurrencyObj   = this.currency_to();


        if ((!fromCurrencyObj) || (!toCurrencyObj)) {
            return null;
        }

        if (fromAmount == null) {
            return null;
        }

        if (isNaN(fromAmount)) {
            return "Entered amount to convert must be number!";
        }

        let fromRate = fromCurrencyObj.rate;
        let toRate = toCurrencyObj.rate;
        let result = (fromAmount * toRate) / fromRate;
        let roundedResult = this.roundTo(result, 2);
        return roundedResult;
        // return result;
    });

    public roundTo(n: number, d: number) {
        // n number to round
        // d number of decimal places to round to

        let m = Math.pow(10, d);
        return Math.round(n * m)/m;
    }

    constructor() {
        fetch('api/Currency/LatestRates')
            .then(response => response.json() as Promise<CurrencyRate[]>)
            .then(data => {
                this.rates(data);
                this.rates_date(data[0]["date"]);
            });
    }
}

export default { viewModel: ConverterViewModel,
                 template: require('./converter.html') };
