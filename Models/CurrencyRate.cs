namespace CurrencyExchange.Models
{
    public class CurrencyRate
    {
        public string Date { get; set; }
        public string Currency { get; set; }
        public string Rate { get; set; }

        public CurrencyRate(string latestDate, string theCurrency, string theRate)
        {
            Date = latestDate;
            Currency = theCurrency;
            Rate = theRate;
        }
    }

}

