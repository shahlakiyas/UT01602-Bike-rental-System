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
                SqlCommand command = new SqlCommand("INSERT INTO Inventory (RegistrationNumber,YearOfManufacture,Availability ,DateAdded, BikeId) VALUES (@RegistrationNumber, @YearOfManufacture, @Availability , @DateAdded , @BikeId);", connection);
                command.Parameters.AddWithValue("@RegistrationNumber", inventoryRequest.RegistrationNumber);
                command.Parameters.AddWithValue("@YearOfManufacture", inventoryRequest.YearOfManufacture);
                command.Parameters.AddWithValue("@BikeId", inventoryRequest.BikeId);
                command.Parameters.AddWithValue("@DateAdded", DateTime.Now);
                command.Parameters.AddWithValue("@Availability", true);

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

        // Read Product by ID
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

       
    }
}
