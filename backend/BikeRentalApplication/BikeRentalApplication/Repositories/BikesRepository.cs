﻿using BikeRentalApplication.DTOs.RequestDTOs;
using BikeRentalApplication.DTOs.ResponseDTOs;
using BikeRentalApplication.Entities;
using System.Data.SqlClient;
using System.Reflection;

namespace BikeRentalApplication.Repositories
{
    public class BikesRepository
    {
        private readonly string _connectionString;
        private readonly ImagesRepository _imageRepository;
        private readonly InventoryRepository _inventoryRepository;
   
        public BikesRepository(IConfiguration configuration , ImagesRepository imagesRepository , InventoryRepository inventoryRepository)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _imageRepository = imagesRepository;
            _inventoryRepository = inventoryRepository;
     
        }

        public async Task<int> AddBikeAsync(BikeRequest bike)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("INSERT INTO Bikes (Brand,Type,Modal,RatePerHour) VALUES (@Brand, @Type ,@Modal,@RatePerHour); SELECT SCOPE_IDENTITY();", connection);
                command.Parameters.AddWithValue("@Brand", bike.Brand);
                command.Parameters.AddWithValue("@Type", bike.Type);
                command.Parameters.AddWithValue("@Modal", bike.Modal);
                command.Parameters.AddWithValue("@RatePerHour", bike.RatePerHour);

                await connection.OpenAsync();
                var id = await command.ExecuteScalarAsync();
                return Convert.ToInt32(id);
            }

        }

        public async Task<List<Bike>> GetAllBikesAsync()
        {
            var bikes = new List<Bike>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Bikes", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    bikes.Add(new Bike
                    {
                        Id = (int)reader["Id"],
                        Brand = reader["Brand"].ToString(),
                        Modal = reader["Modal"].ToString(),
                        Type = reader["Type"].ToString(),
                        RatePerHour = (decimal)reader["RatePerHour"]
                    });
                }
            }
            return bikes;
        }
        // Get Bike By Id
        public async Task<Bike> GetBikeById(int id)
        {
          
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Bikes WHERE Id = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);

                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                if (reader.Read())
                {
                    return new Bike
                    {
                        Id = (int)reader["Id"],
                        Brand = reader["Brand"].ToString(),
                        Type = reader["Type"].ToString(),
                        Modal = reader["Modal"].ToString(),
                        RatePerHour = (decimal)reader["RatePerHour"]
                    };
                }
                return null;
            }
        }

        //Update Bike by ID
        public async Task<int> UpdateBike(BikeRequest bike , int Id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("UPDATE Bikes SET Brand = @Brand, Type = @Type,Modal = @Modal, RatePerHour = @RatePerHour WHERE Id = @Id", connection);
                command.Parameters.AddWithValue("@Id", Id);
                command.Parameters.AddWithValue("@Brand", bike.Brand);
                command.Parameters.AddWithValue("@Modal", bike.Modal);
                command.Parameters.AddWithValue("@Type", bike.Type);
                command.Parameters.AddWithValue("@RatePerHour", bike.RatePerHour);

                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync();
                return result;
            }
        }

        //Delete Bike By Id 
        public async Task<bool> DeleteBikeAsync(int id)
        {
            var units = await _inventoryRepository.GetUnitsByBikeId(id);
            if(units == null) throw new Exception("Can not delete bike"); 
            foreach (var unit in units)
            {
                var availabilty = await _inventoryRepository.CheckAvailability(unit.RegistrationNumber);
                if (availabilty == true) {
                    using (SqlConnection connection = new SqlConnection(_connectionString))
                    {
                        SqlCommand command = new SqlCommand("UPDATE Inventory SET isDeleted = @isDeleted  WHERE RegistrationNumber = @RegistrationNumber", connection);
                        command.Parameters.AddWithValue("@RegistrationNumber", unit.RegistrationNumber);
                        command.Parameters.AddWithValue("@isDeleted", 1);

                        await connection.OpenAsync();
                        var result = await command.ExecuteNonQueryAsync();
                        return result > 0;
                    }
                }
            }
            return false;
       
        }
         //Get Bikes with Images
        public async Task<List<BikeImageUnit>> GetAllBikesWithAsync()
        {
          
            var bikesWithImages = new List<BikeImageUnit>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("select * from Bikes", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    var images = await _imageRepository.GetProductByIdAsync((int)reader["Id"]);
                    var Availableunits = await _inventoryRepository.GetAvailableUnitsByBikeId((int)reader["Id"]);
                    
                        bikesWithImages.Add(new BikeImageUnit
                        {
                            BikeId = (int)reader["Id"],
                            Brand = reader["Brand"].ToString(),
                            Modal = reader["Modal"].ToString(),
                            Type = reader["Type"].ToString(),
                            RatePerHour = (decimal)reader["RatePerHour"],
                            BikeImages = images,
                            Units = Availableunits
                        });
                                       
                  
                
                }
            }
            return bikesWithImages;
        }
        // Get Bike By Id with images
        public async Task<BikeImageUnit> GetBikeByIdWithImages(int id)
        {
         
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("select * from Bikes where Id =@Id", connection);
                command.Parameters.AddWithValue("@Id", id);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                if (reader.Read())
                {
                    var images = await _imageRepository.GetProductByIdAsync(id);
                    var units = await _inventoryRepository.GetUnitsByBikeId(id);
                    if (units != null) {
                        return new BikeImageUnit
                        {
                            BikeId = (int)reader["Id"],
                            Brand = reader["Brand"].ToString(),
                            Type = reader["Type"].ToString(),
                            Modal = reader["Modal"].ToString(),
                            RatePerHour = (decimal)reader["RatePerHour"],
                            BikeImages = images,
                            Units = units
                        };
                    }
                    else
                    {
                        throw new Exception();
                    }
                 
                }
                return null;
            }
        }



    }

}


