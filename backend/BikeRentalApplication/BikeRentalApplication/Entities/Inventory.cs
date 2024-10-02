namespace BikeRentalApplication.Entities
{
    public class Inventory
    {
        public string RegistrationNumber { get; set; }
        public int YearOfManufacture { get; set; }
        public bool Availabilty = true;
        public DateTime DateAdded = DateTime.Now;
        public int BikeId { get; set; }

    }
}
