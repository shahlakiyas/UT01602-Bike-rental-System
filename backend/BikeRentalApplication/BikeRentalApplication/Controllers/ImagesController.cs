using BikeRentalApplication.Entities;
using BikeRentalApplication.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BikeRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly ImagesRepository _imagesRepository;

        public ImagesController(ImagesRepository imagesRepository)
        {
            _imagesRepository = imagesRepository;
        }

        // Create Bike
        [HttpPost("Add-Image")]
        public async Task<IActionResult> AddImage(Image image)
        {
            var productId = await _imagesRepository.AddImageAsync(image);
            return Ok(productId);
        }

        [HttpGet("Get-All-bikes-With-Images")]
        public async Task<IActionResult> GetAllBikesWithIamges()
        {
            var bikes = await _imagesRepository.GetProductByIdAsync(2);
            return Ok(bikes);
        }
    }
}
