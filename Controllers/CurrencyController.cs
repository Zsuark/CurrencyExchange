using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using System.Text;
using System.Xml;

using CurrencyExchange.Models;

namespace CurrencyExchange.Controllers
{
    [Route("api/[controller]")]
    public class CurrencyController : Controller
    {

        //TODO - put this in config file!
        String URLString = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml";


        // TODO - reload XML only when needed! "Sometime after 16:00" CET every week day
        // We do not need to constantly reload the XML every time a browser is refreshed

        // TODO Use Linq for deserialisation

        [HttpGet("[action]")]
        public IEnumerable<CurrencyRate> LatestRates()
        {
            /** Returns the latest currency conversion rates */

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(URLString);

            XmlNode timeNode =
                xmlDoc.DocumentElement.ChildNodes[2].ChildNodes[0];

            string theDate = timeNode.Attributes["time"].Value;

            List<CurrencyRate> latestRates = new List<CurrencyRate>();
            latestRates.Add(new CurrencyRate(theDate, "EUR", "1"));

            foreach (XmlNode currencyNode in timeNode)
            {
                string currency = currencyNode.Attributes["currency"].Value;
                string rate = currencyNode.Attributes["rate"].Value;
                latestRates.Add(new CurrencyRate(theDate, currency, rate));
            }

            return latestRates;
        }
    }
}
