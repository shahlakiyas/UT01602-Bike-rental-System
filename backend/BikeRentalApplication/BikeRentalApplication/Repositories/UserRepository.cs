using BikeRentalApplication.DTOs.RequestDTOs;
using BikeRentalApplication.Entities;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Numerics;

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
        public async Task<string> CreateUserAsync(UserRequest user)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@"INSERT INTO Users (NICNumber,FirstName,LastName , Email , ContactNo, Address , password ,isAdmin , AccountCreated , isBlocked) 
                 VALUES (@NICNumber, @FirstName, @LastName , @Email , @ContactNo, @Address ,  @password , @isAdmin , @AccountCreated , @isBlocked );", connection);
                command.Parameters.AddWithValue("@NICNumber", user.NICNumber);
                command.Parameters.AddWithValue("@FirstName", user.FirstName);
                command.Parameters.AddWithValue("@LastName", user.LastName);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@ContactNo", user.ContactNo);
                command.Parameters.AddWithValue("@Address", user.Address);
                command.Parameters.AddWithValue("@password", user.Password);
                command.Parameters.AddWithValue("@isAdmin", user.IsAdmin);
                command.Parameters.AddWithValue("@AccountCreated", DateTime.Now);
                command.Parameters.AddWithValue("@isBlocked", false);


                await connection.OpenAsync();
                var NICNo = await command.ExecuteScalarAsync();
                return Convert.ToString(NICNo);
            }

        }

        //Read User by id
        public async Task<User> GetUserByIdAsync(string NIC)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Users WHERE NICNumber = @NICNumber", connection);
                command.Parameters.AddWithValue("@NICNumber", NIC);
                User user = new User();
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();

                if (reader.Read())
                {

                    user.NICNumber = reader.GetString(0);
                    user.FirstName = reader.GetString(1);
                    user.LastName = reader.GetString(2);
                    user.Email = reader.GetString(3);
                    user.ContactNo = reader.GetString(4);
                    user.Address = reader.GetString(5);
                    user.Password = reader.GetString(6);
                    user.IsAdmin = reader.GetBoolean(7);
                    user.AccountCreated = reader.GetDateTime(8);

                }
                else
                {
                    throw new Exception();
                }
                return user;

            }


        }

        // Read All User

        public async Task<List<User>> GetAllUsersAsync()
        {
            var Users = new List<User>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Users", connection);
                await connection.OpenAsync();
               

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    User user = new User();
                    user.NICNumber = reader.GetString(0);
                    user.FirstName = reader.GetString(1);
                    user.LastName = reader.GetString(2);
                    user.Email = reader.GetString(3);
                    user.ContactNo= reader.GetString(4);
                    user.Address = reader.GetString(5);
                    user.Password = reader.GetString(6);
                    user.IsAdmin = reader.GetBoolean(7);
                    user.AccountCreated = reader.GetDateTime(8);
                    Users.Add(user);
                }
                return Users;

            }
        }


        public async Task<bool> UpdateUserAsync(string NIC, UserRequest user)
        {
            using(SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@"UPDATE Users SET NICNumber=@NICNumber,FirstName=@FirstName,
                        LastName=@LastName,Email=@Email,ContactNo=@ContactNo,Address=@Address,password=@password
                         WHERE NICNumber=@NICNumber ", connection);
                command.Parameters.AddWithValue("@NICNumber", NIC);
                command.Parameters.AddWithValue("@FirstName", user.FirstName);
                command.Parameters.AddWithValue("@LastName", user.LastName);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@ContactNo", user.ContactNo);
                command.Parameters.AddWithValue("@Address", user.Address);
                command.Parameters.AddWithValue("@password", user.Password);

                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync();
                return result > 0;

            }
        }


    }
}
