using BikeRentalApplication.Entities;
using BikeRentalApplication.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BikeRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BikesController : ControllerBase
    {
        private readonly BikesRepository _bikesRepository;

        public BikesController(BikesRepository bikesRepository)
        {
            _bikesRepository = bikesRepository;
        }
        // Get All Bikes
        [HttpGet("Get-All-bikes")]
        public async Task<IActionResult> GetAllBikes()
        {
            var bikes = await _bikesRepository.GetAllBikesAsync();
            return Ok(bikes);
        }

        // Create Bike
        [HttpPost]
        public async Task<IActionResult> AddNewBike(Bike bike)
        {
            var bikeId = await _bikesRepository.AddBikeAsync(bike);
            var addedBike = await _bikesRepository.GetBikeById(bikeId);
            return Ok(addedBike);
        }

        //Update Bikes
        [HttpPut("Update-Bike")]
        public async Task<IActionResult> UpdateBike(int id, Bike bike)
        {
            var updated = await _bikesRepository.UpdateBike(bike);
            var updatedBike = await _bikesRepository.GetBikeById(id);
            return Ok(updatedBike);
        }
        // Delete Bike
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var deleted = await _bikesRepository.DeleteBikeAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }



    }
}
