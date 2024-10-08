namespace BikeRentalApplication.Entities
{
    public class RentalRecord
    {
        public int RecordId { get; set; }
        public DateTime RentalOut { get; set; }
        public DateTime? RentalReturn { get; set; }
        public decimal Payment { get; set; }
        public int RentalId   { get; set; }
    }
}
