using System;
namespace GbAssignementBackend.Models
{
	public class CountryVAT
    {
		public string Country { get; set; } = string.Empty;
		public List<int> VatRate { get; set; } = new List<int>();
    }
}

