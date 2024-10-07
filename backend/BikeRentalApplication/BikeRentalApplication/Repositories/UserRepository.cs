using BikeRentalApplication.Entities;
using System.Data.SqlClient;

namespace BikeRentalApplication.Repositories
{
    public class UserRepository
    {
        private readonly string _connectionString;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // Add New User
        public async Task<string> CreateUserAsync(User user)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@"INSERT INTO Users (NICNumber,FirstName,LastName , Email , ContactNo, Address , password ,role , AccountCreated) 
                 VALUES (@NICNumber, @FirstName, @LastName , @Email , @ContactNo, @Address ,  @password , @role , @AccountCreated );", connection);
                command.Parameters.AddWithValue("@NICNumber", user.NICNumber);
                command.Parameters.AddWithValue("@FirstName", user.FirstName);
                command.Parameters.AddWithValue("@LastName", user.LastName);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@ContactNo", user.ContactNo);
                command.Parameters.AddWithValue("@Address", user.Address);
                command.Parameters.AddWithValue("@password", user.Role);
                command.Parameters.AddWithValue("@role", user.Password);
                command.Parameters.AddWithValue("@AccountCreated", DateTime.Now);


                await connection.OpenAsync();
                var NICNo = await command.ExecuteScalarAsync();
                return Convert.ToString(NICNo);
            }

        }
    }
}
