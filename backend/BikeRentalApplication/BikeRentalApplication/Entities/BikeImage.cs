namespace BikeRentalApplication.Entities
{
    public class BikeImage
    {
        public int BikeId { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Modal { get; set; }
        public decimal RatePerHour { get; set; }
        public List<Image> BikeImages { get; set; }
    }
}
