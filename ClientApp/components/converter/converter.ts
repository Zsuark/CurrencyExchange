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
        console.log("fromAmount: " + fromAmount);


        let fromCurrencyObj = this.currency_from();
        let toCurrencyObj   = this.currency_to();


        if ((!fromCurrencyObj) || (!toCurrencyObj)) {
            return null;
        }

        if (fromAmount == null) {
            return null;
        }

        if (isNaN(this.from_amount())) {
            return "Entered amount to convert must be number!";
        }

        console.log("fromCurrencyObj:");
        console.log(fromCurrencyObj);
        console.log("toCurrencyObj: ");
        console.log(toCurrencyObj);

        console.log("typeof fromCurrencyObj");

        let fromType = typeof fromCurrencyObj;

        console.log(fromType);

        let fromRate = fromCurrencyObj.rate;
        let toRate = toCurrencyObj.rate;


        console.log("fromRate:");
        console.log(fromRate);
        console.log("toRate:");
        console.log(toRate);

        return (fromAmount * toRate) / fromRate;
    });


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
