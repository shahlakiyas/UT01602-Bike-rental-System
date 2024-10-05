namespace BikeRentalApplication.DTOs.RequestDTOs
{
    public class InventoryRequest
    {
        public string RegistrationNumber { get; set; }
        public int YearOfManufacture { get; set; }

        public int BikeId { get; set; }
    }
}
