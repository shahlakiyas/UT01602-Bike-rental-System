﻿namespace BikeRentalApplication.Entities
{
    public class Image
    {
        public int ImageId { get; set; }
        public string ImagePath { get; set; } // For storage
        public int BikeId { get; set; }
    }
}
