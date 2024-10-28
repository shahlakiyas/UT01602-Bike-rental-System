using BikeRentalApplication.DTOs.RequestDTOs;
using BikeRentalApplication.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace BikeRentalApplication.Repositories
{
    public class InventoryRepository
    {
        private readonly string _connectionString;
        public InventoryRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }


        // Create Inventory item
        public async Task<bool> CreateInventoryItemAsync(InventoryRequest inventoryRequest)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("INSERT INTO Inventory (RegistrationNumber,YearOfManufacture,Availability ,DateAdded, BikeId , isDeleted) VALUES (@RegistrationNumber, @YearOfManufacture, @Availability , @DateAdded , @BikeId ,@isDeleted);", connection);
                command.Parameters.AddWithValue("@RegistrationNumber", inventoryRequest.RegistrationNumber);
                command.Parameters.AddWithValue("@YearOfManufacture", inventoryRequest.YearOfManufacture);
                command.Parameters.AddWithValue("@BikeId", inventoryRequest.BikeId);
                command.Parameters.AddWithValue("@DateAdded", DateTime.Now);
                command.Parameters.AddWithValue("@Availability", true);
                command.Parameters.AddWithValue("@isDeleted" , false);
                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync();
                if (result > 0) {
                    return true ;
                }
                else
                {
                    return false;
                }
                
            }

        }

        // Read Bike by Registration number
        public async Task<Inventory> GetInventoryItemByRegNo(string RegNo)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Inventory WHERE RegistrationNumber = @RegistrationNumber", connection);
                command.Parameters.AddWithValue("@RegistrationNumber", RegNo);

                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                if (reader.Read())
                {
                    return new Inventory
                    {
                        RegistrationNumber = reader["RegistrationNumber"].ToString(),
                        YearOfManufacture = (int)reader["YearOfManufacture"],
                        Availability = (bool)reader["Availability"],
                        DateAdded = (DateTime)reader["DateAdded"],
                        BikeId = (int)reader["BikeId"]
                    };
                }
                return null;
            }
        }

        // Read Units by Bike ID
        public async Task<List<Inventory>> GetUnitsByBikeId(int BikeId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Inventory WHERE BikeId = @BikeId;", connection);
                command.Parameters.AddWithValue("@BikeId", BikeId);
                var Units = new List<Inventory>();  
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {

                    var unit = new Inventory()
                    {
                        RegistrationNumber = reader["RegistrationNumber"].ToString(),
                        YearOfManufacture = (int)reader["YearOfManufacture"],
                        Availability = (bool)reader["Availability"],
                        DateAdded = (DateTime)reader["DateAdded"],
                        BikeId = (int)reader["BikeId"]
                    };
                       
                    Units.Add(unit);
                }
                return Units;
            }
        }

        // Read available Units by Bike ID
        public async Task<List<Inventory>> GetAvailableUnitsByBikeId(int BikeId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@"select * from Bikes inner join Inventory on Bikes.Id = Inventory.BikeId where Inventory.Availability = 1 and isDeleted= 0 and Bikes.Id = @BikeId", connection);
                command.Parameters.AddWithValue("@BikeId", BikeId);
                var Units = new List<Inventory>();
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {

                    var unit = new Inventory()
                    {
                        RegistrationNumber = reader["RegistrationNumber"].ToString(),
                        YearOfManufacture = (int)reader["YearOfManufacture"],
                        DateAdded = (DateTime)reader["DateAdded"],
                        BikeId = (int)reader["BikeId"],
                        Availability = (bool)reader["Availability"]
                    };

                    Units.Add(unit);
                }
                return Units;
            }


            
        }

        public async Task<bool> ChangeAvailabilty(string bikeRegNo)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("UPDATE Inventory SET Availability = @Availability WHERE RegistrationNumber  = @RegistrationNumber", connection);
                command.Parameters.AddWithValue("@RegistrationNumber", bikeRegNo);
                command.Parameters.AddWithValue("@Availability", false);
                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync();
                return result > 0;
            }
        }


    }
}
