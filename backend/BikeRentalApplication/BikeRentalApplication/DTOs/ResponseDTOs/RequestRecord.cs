namespace BikeRentalApplication.DTOs.ResponseDTOs
{
    public class RequestRecord
    {
        public int RentalId { get; set; }
        public DateTime RequestTime { get; set; }
        public bool Status { get; set; }
        public int BikeId { get; set; }
        public string NICNumber { get; set; }

        public int RecordId { get; set; }
        public DateTime RentalOut { get; set; }
        public DateTime? RentalReturn { get; set; }
        public decimal Payment { get; set; }

    }
}
