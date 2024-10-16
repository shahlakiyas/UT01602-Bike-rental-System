namespace BikeRentalApplication.DTOs.ResponseDTOs
{
    public class Payment
    {
        public int RecordId { get; set; } 
        public decimal RentalPayment {  get; set; }   

        public DateTime RentalOut {  get; set; }    
        
    }
}
