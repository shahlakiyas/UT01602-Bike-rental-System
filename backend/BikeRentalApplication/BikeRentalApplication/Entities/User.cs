namespace BikeRentalApplication.Entities
{
    public class User
    {
      public string  NICNumber { get; set; }
        public string FirstName { get; set; }   
        public string LastName { get; set; }
        public string Email { get; set; }   
        public int ContactNo { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public string Role{ get; set; }
        public DateTime AccountCreated { get; set; }
    }
}
