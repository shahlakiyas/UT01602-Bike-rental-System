
using BikeRentalApplication.Dbset;
using BikeRentalApplication.Repositories;
using Microsoft.Extensions.Configuration;

namespace BikeRentalApplication
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });

            // Add services for Controllers
            builder.Services.AddControllers();

            // Optionally add Swagger/OpenAPI for API documentation
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            // Configure services (no ConfigureServices method, just use builder.Services)
            builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

            // Register the bikeRentalDBset as a scoped service
            builder.Services.AddScoped<bikeRentalDBset>();


            builder.Services.AddSingleton<ProductRepository>();
            builder.Services.AddSingleton<BikesRepository>();
            builder.Services.AddSingleton<ImagesRepository>();
            builder.Services.AddSingleton<InventoryRepository>();
            builder.Services.AddSingleton<UserRepository>();
            builder.Services.AddSingleton<RentalRequestRepository>();
            builder.Services.AddSingleton<RentalRecordRepository>();


            // Build the application
            var app = builder.Build();

            // Access bikeRentalDBset and invoke the CreateTable method
            using (var scope = app.Services.CreateScope())
            {
                var dbSet = scope.ServiceProvider.GetRequiredService<bikeRentalDBset>();
                var result = await dbSet.CreateTable();
        
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Enable CORS
            app.UseCors("AllowAll");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            // Run the application
            app.Run();
        }
    }
}
