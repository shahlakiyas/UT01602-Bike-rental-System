using BikeRentalApplication.Entities;
using System.Data.SqlClient;

namespace BikeRentalApplication.Repositories
{
    public class RentalRecordRepository
    {
        private readonly string _connectionString;

        public RentalRecordRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // Create Rental Record
        public async Task<int> AddRentalRecord(RentalRecord rentalRecord)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("INSERT INTO RentalRecords (RentalOut,RentalReturn,Payment,RentalId) VALUES (@RentalOut, @RentalReturn, @Payment,@RentalId); SELECT SCOPE_IDENTITY();", connection);
                command.Parameters.AddWithValue("@RentalOut", rentalRecord.RentalOut);
                command.Parameters.AddWithValue("@RentalReturn", null);
                command.Parameters.AddWithValue("@Payment", null);
                command.Parameters.AddWithValue("@RentalId", rentalRecord.RentalId);

                await connection.OpenAsync();
                var id = await command.ExecuteScalarAsync();
                return Convert.ToInt32(id);
            }

        }
    }
}
