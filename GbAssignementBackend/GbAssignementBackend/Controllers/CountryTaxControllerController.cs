using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GbAssignementBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GbAssignementBackend.Controllers
{
    [Route("api/[controller]")]
    public class CountryTaxController : Controller
    {
        [HttpGet]
        public List<CountryVAT> Get()
        {
            var countriesVATs = new List<CountryVAT>();

            countriesVATs.Add(new CountryVAT
            {
                Country = "Austria",
                VatRate = { 5, 10, 13, 20 }
            });
            countriesVATs.Add(new CountryVAT
            {
                Country = "United Kingdom",
                VatRate = { 5, 20 }
            });
            countriesVATs.Add(new CountryVAT
            {
                Country = "Portugal",
                VatRate = { 6, 13, 23 }
            });
            countriesVATs.Add(new CountryVAT
            {
                Country = "Singapore",
                VatRate = { 7 }
            });

            return countriesVATs;
        }
    }
}

