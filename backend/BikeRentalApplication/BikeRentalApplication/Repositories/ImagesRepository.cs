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

        //Add Image
        public async Task<int> AddImageAsync(Image image)
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

        //Get Image By BikeId
        public async Task<List<Image>> GetProductByIdAsync(int bikeId)
        {
            var images = new List<Image>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("select * from images where BikeId=@BikeId", connection);
                command.Parameters.AddWithValue("@BikeId", bikeId);

                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                if (reader.Read())
                {
                    images.Add(new Image
                    {
                        ImageId = (int)reader["ImageId"],
                        ImagePath = reader["ImagePath"].ToString(),
                        BikeId = (int)reader["ImageId"]
                    });

                }
                return images;
            }
        }


    }
}
