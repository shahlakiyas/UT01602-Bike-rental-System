using BikeRentalApplication.DTOs.RequestDTOs;
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
                SqlCommand command = new SqlCommand("INSERT INTO RentalRequests (RequestTime,Status,BikeId,NICNumber,UserAlert) VALUES (@RequestTime,@Status,@BikeId, @NICNumber, @UserAlert); SELECT SCOPE_IDENTITY();", connection);
                command.Parameters.AddWithValue("@RequestTime", rentalRequestRequest.RequestTime);
                command.Parameters.AddWithValue("@Status", false);
                command.Parameters.AddWithValue("@BikeId", rentalRequestRequest.BikeId);
                command.Parameters.AddWithValue("@NICNumber", rentalRequestRequest.NICNumber);
                command.Parameters.AddWithValue("@UserAlert", false);

                await connection.OpenAsync();
                var id = await command.ExecuteScalarAsync();
                return Convert.ToInt32(id);
            }

        }


        // Accept Request Status
        public async Task<bool> AcceptRequestStatus(int RequestID)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("UPDATE RentalRequests SET Status = @Status , UserAlert=@UserAlert WHERE RentalId = @RentalId", connection);
                command.Parameters.AddWithValue("@RentalId", RequestID);
                command.Parameters.AddWithValue("@Status", true);
                command.Parameters.AddWithValue("@UserAlert", true);

                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync();
                return result > 0;
            }
        }

        //Decline request Status
        public async Task<bool> DeclineRentalRequest(int RequestID)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("UPDATE RentalRequests SET Status = @Status , UserAlert=@UserAlert WHERE RentalId = @RentalId", connection);
                command.Parameters.AddWithValue("@RentalId", RequestID);
                command.Parameters.AddWithValue("@Status", false);
                command.Parameters.AddWithValue("@UserAlert", true);

                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync();
                return result > 0;
            }
        }

        // Read All RentalRequests
        public async Task<List<RentalRequest>> GetAllRequestsAsync()
        {
            var rentalRequests = new List<RentalRequest>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM RentalRequests where UserAlert = 0 ", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    rentalRequests.Add(new RentalRequest
                    {
                        RentalId = (int)reader["RentalId"],
                        RequestTime = (DateTime)reader["RequestTime"],
                        Status = (bool)reader["Status"],
                        BikeId = (int)reader["BikeId"],
                        NICNumber = reader["NICNumber"].ToString(),
                    });
                }
            }
            return rentalRequests;
        }

        // Read Product by ID
        public async Task<RentalRequest> GetRequestByIdAsync(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM RentalRequests WHERE RentalId = @RentalId", connection);
                command.Parameters.AddWithValue("@RentalId", id);

                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                if (reader.Read())
                {
                    return new RentalRequest
                    {
                        RentalId = (int)reader["RentalId"],
                        RequestTime = (DateTime)reader["RequestTime"],
                        Status = (bool)reader["Status"],
                        BikeId = (int)reader["BikeId"],
                        NICNumber = reader["NICNumber"].ToString(),
                    };
                }
                return null;
            }
        }

         public async Task<List<RentalRequest>> NotifyUser(string NICNo)
        {
            var rentalRequests = new List<RentalRequest>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM RentalRequests where UserAlert = 1 and NICNumber = @NICNumber ", connection);
                command.Parameters.AddWithValue("@NICNumber" , NICNo);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    rentalRequests.Add(new RentalRequest
                    {
                        RentalId = (int)reader["RentalId"],
                        RequestTime = (DateTime)reader["RequestTime"],
                        Status = (bool)reader["Status"],
                        BikeId = (int)reader["BikeId"],
                        NICNumber = reader["NICNumber"].ToString(),
                    });
                }
            }
            return rentalRequests;
        }
    }
}
