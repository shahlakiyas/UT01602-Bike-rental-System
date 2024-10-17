namespace BikeRentalApplication.Entities
{
    public class User
    {
        public string NICNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public DateTime AccountCreated { get; set; }

        public bool IsAdmin { get; set; }
        public bool isBlocked { get; set; }
    }
}
