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
        [HttpPost]
        public async Task<IActionResult> CreateProduct(Images image)
        {
            var productId = await _imagesRepository.AddBikeAsync(image);
            return Ok(productId);
        }
    }
}
