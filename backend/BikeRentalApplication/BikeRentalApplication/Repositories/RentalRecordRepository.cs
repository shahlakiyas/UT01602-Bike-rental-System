using BikeRentalApplication.DTOs.RequestDTOs;
using BikeRentalApplication.DTOs.ResponseDTOs;
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
        public async Task<int> AddRentalRecord(RentalRecordRequest rentalRecord)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("INSERT INTO RentalRecords (RentalId) VALUES (@RentalId); SELECT SCOPE_IDENTITY();", connection);
                command.Parameters.AddWithValue("@RentalId", rentalRecord.RentalId);

                await connection.OpenAsync();
                var id = await command.ExecuteScalarAsync();
                return Convert.ToInt32(id);
            }

        }



       // get Accepted RentalRecords with their rentalRequests for rental portal
        public async Task<List<RequestRecord>> GetRentalRecordsforPortal()
        {
            var records = new List<RequestRecord>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@"SELECT * FROM RentalRecords  inner join RentalRequests on RentalRecords.RentalId = RentalRequests.RentalId 
                                                    where RentalRecords.RentalOut is null  ;", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    records.Add(new RequestRecord
                    {
                        RecordId = (int)reader["RecordId"],
                        RequestTime = (DateTime)reader["RequestTime"],
                        NICNumber = reader["NICNumber"].ToString(),
                        BikeId = (int)reader["BikeId"]
                        
                    });
                }
            }
            return records;
        }

        //Get Out Rentals for return Proceesing
        public async Task<List<RequestRecord>> GetRentalRecordsforReturn()
        {
            var records = new List<RequestRecord>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@"SELECT * FROM RentalRecords  inner join RentalRequests on RentalRecords.RentalId = RentalRequests.RentalId
                                                       where RentalRecords.RentalReturn is null and RentalOut is Not Null ;", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    records.Add(new RequestRecord
                    {
                        RecordId = (int)reader["RecordId"],
                        RentalOut = (DateTime)reader["RentalOut"],
                        NICNumber = reader["NICNumber"].ToString(),
                        BikeId = (int)reader["BikeId"],
                        RegistrationNumber = reader["RegistrationNumber"].ToString()

                    });
                }
            }
            return records;
        }


        //Get payment with Record Id with rentalTime

        public async Task<Payment> GetRentalPayment(int recordId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var paymentRecord = new Payment();
                SqlCommand command = new SqlCommand(@"SELECT RecordId , RatePerHour , RentalOut FROM RentalRecords  inner join RentalRequests on RentalRecords.RentalId = RentalRequests.RentalId
                                                       inner join Bikes on RentalRequests.BikeId = Bikes.Id; ", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                if (reader.Read())
                {
                   
                    paymentRecord.RecordId = (int)reader["RecordId"];
                    paymentRecord.RentalOut = (DateTime)reader["RentalOut"];
                    decimal ratePerHour = (decimal)reader["RatePerHour"];
                    decimal minsSpan = DateTime.Now.Subtract(paymentRecord.RentalOut).Minutes;
                    paymentRecord.RentalPayment = (ratePerHour / 60) * minsSpan;
                }
                return paymentRecord;
            }
        }

        //Complete RentalRecord 

        public async Task<int> CompleteRentalRecord(decimal Payment, int RecordId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("UPDATE RentalRecords SET RentalReturn = @RentalReturn , Payment = @Payment  WHERE RecordId = @RecordId", connection);
                command.Parameters.AddWithValue("@RentalReturn", DateTime.Now);
                command.Parameters.AddWithValue("@Payment", Payment);
                command.Parameters.AddWithValue("@RecordId", RecordId);


                await connection.OpenAsync();
                var rowsAffected = await command.ExecuteNonQueryAsync();
                if (rowsAffected > 0)
                {
                    return RecordId;
                }
                else
                {
                    throw new Exception();
                }

            }
        }



        // Update the rentalOut time

        public async Task<DateTime> UpdateRentalOut(string BikeRegNo , int RecordId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("UPDATE RentalRecords SET RentalOut = @RentalOut , RegistrationNumber = @RegistrationNumber  WHERE RecordId = @RecordId", connection);
                command.Parameters.AddWithValue("@RentalOut", DateTime.Now);
                command.Parameters.AddWithValue("@RegistrationNumber", BikeRegNo);
                command.Parameters.AddWithValue("@RecordId", RecordId);
                await connection.OpenAsync();
                var rowsAffected = await command.ExecuteNonQueryAsync();
                if(rowsAffected > 0)
                {
                    return DateTime.Now;
                }
                else
                {
                    throw new Exception();
                }
               
            }
        }

        //Get rental Records of a user 
        public async Task<List<RequestRecord>>GetRecordsOfUser(string NICNo)
        {
            var records = new List<RequestRecord>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@"select RecordId ,RentalOut ,RentalReturn,Payment,RentalRequests.RentalId , RequestTime, Status ,BikeId 
                                                     from RentalRecords inner join RentalRequests on RentalRequests.RentalId = RentalRecords.RentalId inner join Users
                                                      on RentalRequests.NICNumber = Users.NICNumber where Users.NICNumber = @NICnumber", connection);
                command.Parameters.AddWithValue("@NICnumber", NICNo);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    records.Add(new RequestRecord
                    {
                        RecordId = (int)reader["RecordId"],
                        RentalOut = (DateTime)reader["RentalOut"],
                        RentalReturn = (DateTime)reader["RentalReturn"],
                        Payment = (decimal)reader["Payment"],
                        RentalId = (int)reader["RentalId"],
                        RequestTime = (DateTime)reader["RequestTime"],
                        Status = (bool)reader["Status"],
                        BikeId = (int)reader["BikeId"],

                    });
                }
            }
            return records;
        }

        //Get all OverDue Rentals
        public async Task<List<RequestRecord>> GetOverDueRentals()
        {
            var records = new List<RequestRecord>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@"select * from RentalRecords where RentalReturn is null;", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    var record = new RequestRecord();
                    record.RecordId = (int)reader["RecordId"];
                    record.RegistrationNumber = reader["RegistrationNumber"].ToString();

                    if(DateTime.Now.Subtract((DateTime)reader["RentalOut"]).Hours > 24)
                    {
                        record.RentalOut = (DateTime)reader["RentalOut"];
                    }
                    else
                    {
                        throw new Exception();
                    }
                    
                }
            }
            return records;
        }

        //Get All Rental Records 

        public async Task<List<RequestRecord>> GetAllRentalRecords()
        {
            var records = new List<RequestRecord>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@"select RecordId,RentalOut , RentalReturn ,Payment ,  BikeId ,RegistrationNumber,NICNumber  from RentalRecords
                                                      inner join RentalRequests on RentalRecords.RentalId = RentalRequests.RentalId;", connection);
                await connection.OpenAsync();
                SqlDataReader reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    records.Add(new RequestRecord
                    {
                        RecordId = (int)reader["RecordId"],
                        RentalOut = (DateTime)reader["RentalOut"],
                        RentalReturn = (DateTime)reader["RentalReturn"],
                        Payment = (decimal)reader["Payment"],
                        BikeId = (int)reader["BikeId"],
                        RegistrationNumber = reader["RegistrationNumber"].ToString(),
                        NICNumber = reader["NICNumber"].ToString()

                    });
                }
            }
            return records;
        }
    }
}
