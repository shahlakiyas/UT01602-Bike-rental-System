using BikeRentalApplication.Entities;
using System.Data.SqlClient;
using System.Reflection;

namespace BikeRentalApplication.Repositories
{
    public class BikesRepository
    {
        private readonly string _connectionString;
        private readonly ImagesRepository _imageRepository;

        public BikesRepository(IConfiguration configuration , ImagesRepository imagesRepository)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _imageRepository = imagesRepository;
        }

        public async Task<int> AddBikeAsync(Bike bike)
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
        public async Task<bool> UpdateBike(Bike bike)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("UPDATE Bikes SET Brand = @Brand, Type = @Type,Modal = @Modal, RatePerHour = @RatePerHour WHERE Id = @Id", connection);
                command.Parameters.AddWithValue("@Id", bike.Id);
                command.Parameters.AddWithValue("@Brand", bike.Brand);
                command.Parameters.AddWithValue("@Modal", bike.Modal);
                command.Parameters.AddWithValue("@Type", bike.Type);
                command.Parameters.AddWithValue("@RatePerHour", bike.RatePerHour);

                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync();
                return result > 0;
            }
        }

        //Delete Bike By Id 
        public async Task<bool> DeleteBikeAsync(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("DELETE FROM Bikes WHERE Id = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);

                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync();
                return result > 0;
            }
        }
         //Get Bikes with Images
        public async Task<List<BikeImage>> GetAllBikesWithAsync()
        {
          
            var bikesWithImages = new List<BikeImage>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("select * from Bikes inner join Images  on Bikes.Id = Images.BikeId;", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    var images = await _imageRepository.GetProductByIdAsync((int)reader["Id"]);
                    bikesWithImages.Add(new BikeImage
                    {
                        BikeId = (int)reader["Id"],
                        Brand = reader["Brand"].ToString(),
                        Modal = reader["Modal"].ToString(),
                        Type = reader["Type"].ToString(),
                        RatePerHour = (decimal)reader["RatePerHour"],
                        BikeImages = images
                    });   
                
                }
            }
            return bikesWithImages;
        }
        // Get Bike By Id with images
        public async Task<BikeImage> GetBikeByIdWithImages(int id)
        {
            var bikeWithImages = new BikeImage();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("select * from Bikes inner join Images  on Bikes.Id = Images.BikeId;", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                if (reader.Read())
                {
                    var images = await _imageRepository.GetProductByIdAsync(id);
                    return new BikeImage
                    {
                        BikeId = (int)reader["Id"],
                        Brand = reader["Brand"].ToString(),
                        Type = reader["Type"].ToString(),
                        Modal = reader["Modal"].ToString(),
                        RatePerHour = (decimal)reader["RatePerHour"],
                        BikeImages = images
                    };
                }
                return null;
            }
        }



    }

}


