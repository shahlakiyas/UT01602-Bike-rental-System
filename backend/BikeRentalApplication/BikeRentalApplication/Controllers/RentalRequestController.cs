using BikeRentalApplication.DTOs.RequestDTOs;
using BikeRentalApplication.Entities;
using BikeRentalApplication.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BikeRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalRequestController : ControllerBase
    {
        private readonly RentalRequestRepository _rentalRequestRepository;


        public RentalRequestController(RentalRequestRepository rentalRequestRepository)
        {
            _rentalRequestRepository = rentalRequestRepository;
        }

        // Create Product
        [HttpPost]
        public async Task<IActionResult> SendRentalRequest(RentalRequestRequest rentalRequestRequest)
        {
            var productId = await _rentalRequestRepository.CreateRequestAsync(rentalRequestRequest);
            return Ok(productId);
        }
    }
}
