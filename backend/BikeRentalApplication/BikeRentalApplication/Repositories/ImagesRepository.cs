using BikeRentalApplication.Entities;
using System.Data;
using System.Data.SqlClient;

namespace BikeRentalApplication.Repositories
{
    public class ImagesRepository
    {
        private readonly string _connectionString;

        public ImagesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<int> AddBikeAsync(Images image)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("INSERT INTO Images (ImagePath,BikeId) VALUES (@ImagePath,@BikeId); SELECT SCOPE_IDENTITY();", connection);
                command.Parameters.AddWithValue("@ImagePath", image.ImagePath);
                command.Parameters.AddWithValue("@BikeId", image.BikeId);

                await connection.OpenAsync();
                var id = await command.ExecuteScalarAsync();
                return Convert.ToInt32(id);
            }

        }


    }
}
