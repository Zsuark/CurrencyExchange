using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using System.Text;
using System.Xml;

namespace CurrencyExchange.Models
{


    /*
    public class CurrencyRateHistory
    {
        struct DatedRate {
            public String date;
            public String rate;
        }

        public string Currency;
        public List<DatedRate> DailyRates;

        CurrencyRateHistory(IEnumerable<CurrencyRate> history) {
            
        }
    }
    */

    public class CurrencyRate
    {

        /* Note: all Curency Rates does not include the EUR.
         * Note: Latest Currency Rates does include the EUR.
         */


        public string Date { get; set; }
        public string Currency { get; set; }
        public string Rate { get; set; }


        public CurrencyRate(string latestDate, string theCurrency, string theRate)
        {
            Date = latestDate;
            Currency = theCurrency;
            Rate = theRate;
        }

        // EVERYTHING FROM THIS POINT ON ARE STATIC MEMBERS AND METHODS
        // There is no database, we just call static methods to get what we need


        // TODO: put in config file!
        private static string URLString =
            "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml";

        private static XmlDocument xmlDoc = new XmlDocument();

        // private static string latestDate = "0000-00-00";
        private static List<CurrencyRate> latestCurrencyRates;
        private static List<CurrencyRate> historicalCurrencyRates;


        public static List<CurrencyRate> getLatestCurrencyRates()
        {
            populateClass();

            return latestCurrencyRates;
        }

        public static IEnumerable<CurrencyRate> getHistoricalCurrencyRates()
        {
            populateClass();
            return historicalCurrencyRates;
        }


        private static void populateClass()
        {
            // TODO: only execute if needed
            // i.e. check if we need to run and if not return early

            // Load the XML Document
            xmlDoc.Load(URLString);


            // Get the first node of Cubes for the latest results
            XmlNode timeNode =
                xmlDoc.DocumentElement.ChildNodes[2].ChildNodes[0];

            string latestDate = timeNode.Attributes["time"].Value;

            latestCurrencyRates = new List<CurrencyRate>();
            var euroRate = new CurrencyRate(latestDate, "EUR", "1");
            latestCurrencyRates.Add(euroRate);



            foreach (XmlNode currencyNode in timeNode)
            {
                string currency = currencyNode.Attributes["currency"].Value;
                string rate = currencyNode.Attributes["rate"].Value;
                latestCurrencyRates.Add(new CurrencyRate(latestDate, currency, rate));
            }

            // Populate the historical data
            historicalCurrencyRates = new List<CurrencyRate>();
            XmlNamespaceManager xmlnsManager = new XmlNamespaceManager(xmlDoc.NameTable);
            xmlnsManager.AddNamespace("gesmes", "http://www.gesmes.org/xml/2002-08-01");
            xmlnsManager.AddNamespace("lo", "http://www.ecb.int/vocabulary/2002-08-01/eurofxref");
            XmlNodeList myNodeList = xmlDoc.SelectNodes("//lo:Cube[@time]", xmlnsManager);


            foreach (XmlNode currentTimeNode in myNodeList)
            {
                string currentDate = currentTimeNode.Attributes["time"].Value;
                Console.WriteLine("currentTimeNode: " + currentDate);

                foreach (XmlNode currencyNode in currentTimeNode)
                {
                    string currency = currencyNode.Attributes["currency"].Value;
                    string rate = currencyNode.Attributes["rate"].Value;
                    historicalCurrencyRates.Add(new CurrencyRate(currentDate, currency, rate));
                }
            }
        }
    }
}



