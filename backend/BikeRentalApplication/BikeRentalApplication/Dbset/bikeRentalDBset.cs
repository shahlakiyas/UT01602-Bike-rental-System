using BikeRentalApplication.Entities;
using System.Data.SqlClient;

namespace BikeRentalApplication.Dbset
{
    public class bikeRentalDBset
    {
        private readonly string _connectionString;
        private string _Database;
        public bikeRentalDBset(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            this.GetDataBaseName();

        }

        public async Task<bool> CreateTable(string TableName)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand("USE BikeRentalDB ; IF NOT EXISTS (SELECT * FROM sys.tables t  JOIN sys.schemas s ON (t.schema_id = s.schema_id)  WHERE s.name = @DbName AND t.name = @tableName) CREATE TABLE test1 (c1 int, c2 varchar(10));", connection);
                command.Parameters.AddWithValue("@DbName", _Database);
                command.Parameters.AddWithValue("@tableName", TableName);
                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync();
                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public string GetDataBaseName()
        {
            string[] parts = _connectionString.Split(';');

            foreach (var part in parts)
            {
                if (part.Trim().StartsWith("DataBase=", StringComparison.OrdinalIgnoreCase))
                {
                    _Database = part.Substring("DataBase=".Length).Trim();
                };
               
            }
            return _Database;
        }
    }
}
