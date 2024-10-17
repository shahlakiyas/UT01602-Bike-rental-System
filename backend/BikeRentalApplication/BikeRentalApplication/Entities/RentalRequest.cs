using System.Numerics;
using System.Runtime.InteropServices;
using System.Security.Cryptography.Xml;

namespace BikeRentalApplication.Entities
{
    public class RentalRequest
    {
        public int RentalId { get; set; }
        public DateTime RequestTime { get; set; }
        public bool Status { get; set; }
        public int BikeId { get; set; }
        public string NICNumber { get; set; }

    }
}
