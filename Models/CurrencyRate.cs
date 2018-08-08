namespace CurrencyExchange.Models
{
    public class CurrencyRate
    {
        public string Date { get; set; }
        public string Currency { get; set; }
        public string Rate { get; set; }

        public CurrencyRate(string theDate, string theCurrency, string theRate)
        {
            Date = theDate;
            Currency = theCurrency;
            Rate = theRate;
        }
    }
}

