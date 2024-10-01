namespace BikeRentalApplication.Entities
{
    public class Bike
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Modal { get; set; }
        public decimal RatePerHour { get; set; }
    }
}
