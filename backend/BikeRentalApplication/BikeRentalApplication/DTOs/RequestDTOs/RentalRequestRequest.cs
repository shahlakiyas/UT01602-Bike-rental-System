namespace BikeRentalApplication.DTOs.RequestDTOs
{
    public class RentalRequestRequest
    {
        public DateTime RequestTime { get; set; }
        public int BikeId { get; set; }
        public string NICNumber { get; set; }
    }
}
