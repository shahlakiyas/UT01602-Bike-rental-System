﻿using BikeRentalApplication.DTOs.RequestDTOs;
using BikeRentalApplication.Entities;
using System.Data.SqlClient;

namespace BikeRentalApplication.Repositories
{
    public class RentalRequestRepository
    {

        private readonly string _connectionString;

        public RentalRequestRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // Post rental Request
        public async Task<int> CreateRequestAsync(RentalRequestRequest rentalRequestRequest)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("INSERT INTO RentalRequests (RequestTime,Status,BikeId,NICNumber) VALUES (@RequestTime,@Status,@BikeId, @NICNumber); SELECT SCOPE_IDENTITY();", connection);
                command.Parameters.AddWithValue("@RequestTime", rentalRequestRequest.RequestTime);
                command.Parameters.AddWithValue("@Status", false);
                command.Parameters.AddWithValue("@BikeId", rentalRequestRequest.BikeId);
                command.Parameters.AddWithValue("@NICNumber", rentalRequestRequest.NICNumber);

                await connection.OpenAsync();
                var id = await command.ExecuteScalarAsync();
                return Convert.ToInt32(id);
            }

        }
    }
}
