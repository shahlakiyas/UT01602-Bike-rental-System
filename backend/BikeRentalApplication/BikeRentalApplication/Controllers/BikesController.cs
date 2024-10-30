using BikeRentalApplication.DTOs.RequestDTOs;
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
        public async Task<IActionResult> AddNewBike(BikeRequest bike)
        {
            var bikeId = await _bikesRepository.AddBikeAsync(bike);
            var addedBike = await _bikesRepository.GetBikeById(bikeId);
            return Ok(addedBike);
        }

        //Update Bikes
        [HttpPut("Update-Bike")]
        public async Task<IActionResult> UpdateBike(int id, BikeRequest bike)
        {
            var updated = await _bikesRepository.UpdateBike( bike , id);
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

        [HttpGet("Get-All-bikes-With-Images")]
        public async Task<IActionResult> GetAllBikesWithImages()
        {
            try
            {
                var bikes = await _bikesRepository.GetAllBikesWithAsync();
                return Ok(bikes);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("Get-All-bikes-With-Images{id}")]
        public async Task<IActionResult> GetAllBikesWithImages(int id)
        {
            try
            {
                var bikes = await _bikesRepository.GetBikeByIdWithImages(id);
                return Ok(bikes);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }



    }
}
