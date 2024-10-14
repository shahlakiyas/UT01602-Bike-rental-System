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
            _Database = this.GetDataBaseName();
        }

        public async Task<string> CreateTable()
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(@" USE BikeRentalDB ;	
                 IF NOT EXISTS(
		         SELECT * FROM sys.tables t 
		         JOIN sys.schemas s ON (t.schema_id = s.schema_id)
		         WHERE s.name = 'BikeRentalDB' AND t.name = 'Bikes'
                 )
                 CREATE TABLE Bikes
                (
                  Id INT PRIMARY KEY IDENTITY(1,1),
                  Brand VARCHAR(50) NOT NULL,
                  Type VARCHAR(50) NOT NULL,
                  Modal VARCHAR(50) NOT NULL,
                  RatePerHour DECIMAL(18, 2) NOT NULL,
                );
                 IF NOT EXISTS(
		         SELECT * FROM sys.tables t 
		         JOIN sys.schemas s ON (t.schema_id = s.schema_id)
		         WHERE s.name = 'BikeRentalDB' AND t.name = 'Images'
                 )
                CREATE TABLE Images
                (
                  ImageId INT PRIMARY KEY IDENTITY(1,1),
                  ImagePath NvarChar(max) NOT NULL,
                  BikeId INT NOT NULL,
                  FOREIGN KEY (BikeId) REFERENCES Bikes(Id)
                );
                IF NOT EXISTS(
		         SELECT * FROM sys.tables t 
		         JOIN sys.schemas s ON (t.schema_id = s.schema_id)
		         WHERE s.name = 'BikeRentalDB' AND t.name = 'Inventory'
                 )
                 CREATE TABLE Inventory
                (
                  RegistrationNumber NvarChar(50) PRIMARY KEY ,
                  YearOfManufacture Int NOT NULL,
                  Availability Bit NOT NULL,
                  DateAdded DATE NOT NULL,
                  BikeId INT NOT NULL,
                  FOREIGN KEY (BikeId) REFERENCES Bikes(Id)
                );
		       	IF NOT EXISTS(
		        SELECT * from sys.tables t 
		        JOIN sys.schemas s ON (t.schema_id = s.schema_id)
		        WHERE s.name = 'BikeRentalDB' AND t.name = 'Users'
		        ) 
                CREATE TABLE dbo.Users
                 (
                  NICNumber NvarChar(50) PRIMARY KEY NOT NULL,
                  FirstName VARCHAR(50) NOT NULL,
                  LastName VARCHAR(50) NOT NULL,
                  Email VARCHAR(50) NOT NULL,
                  ContactNo  VARCHAR(50) NOT NULL,
                  Address VARCHAR(50) NOT NULL,
                  password VARCHAR(50) NOT NULL,
                  role VARCHAR(10) NOT NULL,
                  AccountCreated DATE NOT NULL
                );
                IF NOT EXISTS(
		                select * from sys.tables t 
		                join sys.schemas s ON (t.schema_id = s.schema_id)
		                WHERE s.name = 'BikeRentalDB' AND t.name = 'RentalRequests')
                CREATE TABLE RentalRequests
                (
                  RentalId INT primary key IDENTITY(1,1),
                  RequestTime DATE NOT NULL,
                  Status Bit NOT NULL,
                  BikeId INT NOT NULL,
                  NICNumber NvarChar(50) NOT NULL,
                  FOREIGN KEY (BikeId) REFERENCES Bikes(Id),
                  FOREIGN KEY (NICNumber) REFERENCES Users(NICNumber)
                );
                 IF NOT EXISTS(
		                select * from sys.tables t 
		                join sys.schemas s ON (t.schema_id = s.schema_id)
		                WHERE s.name = 'BikeRentalDB' AND t.name = 'RentalRecords')
                  CREATE TABLE RentalRecords
                (
                  RecordId INT primary key IDENTITY(1,1),
                  RentalOut DATE NOT NULL,
                  RentalReturn DATE NOT NULL,
                  Payment DECIMAL(18, 2) NOT NULL,
                  RentalId INT NOT NULL,
                  FOREIGN KEY (RentalId) REFERENCES RentalRequests(RentalId)
                );", connection);

                await connection.OpenAsync();
                try
                {
                    var result = await command.ExecuteNonQueryAsync();
                    return _Database + "tables Created";
                }
                catch (Exception ex) {
                    return "";
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
