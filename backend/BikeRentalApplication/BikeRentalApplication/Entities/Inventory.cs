namespace BikeRentalApplication.Entities
{
    public class Inventory
    {
        public string RegistrationNumber { get; set; }
        public int YearOfManufacture { get; set; }
        public bool Availability { get; set; }
        public DateTime DateAdded { get; set; }
        public int BikeId { get; set; }

        public bool IsDeleted { get; set; } 

    }
}
