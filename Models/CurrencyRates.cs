using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using System.Text;
using System.Xml;


namespace CurrencyExchange.Models
{

    public static class CurrencyRates
    {

        // TODO: put in config file!
        private static string URLString = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml";

        private static XmlDocument xmlDoc = new XmlDocument();

        private static string latestDate = "0000-00-00";
        private static SortedSet<string> allCurrencies;
        private static List<CurrencyRate> latestCurrencyRates;
        private static List<CurrencyRate> allCurrencyRates;


        public static List<CurrencyRate> getLatestCurrencyRates()
        {
            populateClass();

            return latestCurrencyRates;
        }

        public static IEnumerable<CurrencyRate> getHistoricCurrencyRates(string code)
        {
            populateClass();

            return from cr in allCurrencyRates
                   where cr.Currency == code
                   select cr;

        }


        private static void populateClass()
        {
            // TODO: only execute if needed
            // i.e. check if we need to run and if not return early

            xmlDoc.Load(URLString);

            XmlNode timeNode =
                xmlDoc.DocumentElement.ChildNodes[2].ChildNodes[0];

            string latestDate = timeNode.Attributes["time"].Value;

            latestCurrencyRates = new List<CurrencyRate>();
            var euroRate = new CurrencyRate(latestDate, "EUR", "1");
            latestCurrencyRates.Add(euroRate);

            allCurrencyRates = new List<CurrencyRate>();
            allCurrencyRates.Add(euroRate);

            foreach (XmlNode currencyNode in timeNode)
            {
                string currency = currencyNode.Attributes["currency"].Value;
                string rate = currencyNode.Attributes["rate"].Value;
                latestCurrencyRates.Add(new CurrencyRate(latestDate, currency, rate));
            }

            allCurrencies = new SortedSet<string>();
            foreach (XmlNode currentTimeNode in xmlDoc.DocumentElement.ChildNodes[2])
            {
                string currentDate = currentTimeNode.Attributes["time"].Value;

                foreach (XmlNode currencyNode in currentTimeNode)
                {
                    string currency = currencyNode.Attributes["currency"].Value;
                    string rate = currencyNode.Attributes["rate"].Value;
                    allCurrencyRates.Add(new CurrencyRate(latestDate, currency, rate));
                    allCurrencies.Add(currency);
                }
            }

            Console.Write("latestDate: ");
            Console.WriteLine(latestDate);
            Console.Write("allCurrencies: ");
            Console.WriteLine(allCurrencies);
            Console.Write("latestCurrencyRates: ");
            Console.WriteLine(latestCurrencyRates);
            Console.Write("allCurrencyRates: ");
            Console.WriteLine(allCurrencyRates);
        }
    }
}

