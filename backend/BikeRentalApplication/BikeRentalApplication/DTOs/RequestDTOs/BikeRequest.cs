namespace BikeRentalApplication.DTOs.RequestDTOs
{
    public class BikeRequest
    {
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Modal { get; set; }
        public decimal RatePerHour { get; set; }
    }
}
