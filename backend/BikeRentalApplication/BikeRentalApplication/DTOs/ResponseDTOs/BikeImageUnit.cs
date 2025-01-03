﻿using BikeRentalApplication.Entities;

namespace BikeRentalApplication.DTOs.ResponseDTOs
{
    public class BikeImageUnit
    {
        public int BikeId { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Modal { get; set; }
        public decimal RatePerHour { get; set; }
        public List<Image> BikeImages { get; set; }

        public List<Inventory> Units { get; set; }
    }
}
