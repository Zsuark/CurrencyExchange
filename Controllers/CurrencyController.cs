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

        // TODO - reload XML only when needed! "Sometime after 16:00" CET every week day
        // We do not need to constantly reload the XML every time a browser is refreshed

        // TODO Use Linq for deserialisation

        [HttpGet("[action]")]
        public IEnumerable<CurrencyRate> LatestRates()
        {
            /** Returns the latest currency conversion rates */

            return CurrencyRate.getLatestCurrencyRates();
        }

        [HttpGet("[action]")]
        public IEnumerable<CurrencyRate> AllRates()
        {
            return CurrencyRate.getHistoricalCurrencyRates();
        }
    }
}
