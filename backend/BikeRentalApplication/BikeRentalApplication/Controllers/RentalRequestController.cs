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

        // Create Rental Request
        [HttpPost]
        public async Task<IActionResult> SendRentalRequest(RentalRequestRequest rentalRequestRequest)
        {
            var productId = await _rentalRequestRepository.CreateRequestAsync(rentalRequestRequest);
            return Ok(productId);
        }

        //Get All rental Requests

        [HttpGet]
        public async Task<IActionResult> GetAllRentalRequests()
        {
            var data = await _rentalRequestRepository.GetAllRequestsAsync();
            return Ok(data);
        }

        // Get Request By Id 

        [HttpGet("{id}")]

        public async Task<IActionResult> GetRentalRequestById(int id)
        {
            var data = await _rentalRequestRepository.GetRequestByIdAsync(id);
            return Ok(data);
        }

        [HttpPut("Change-Request-Status{id}")]

        public async Task<IActionResult> ChaneRentalRequest(int id)
        {
            try
            { 
                var getRequest = await _rentalRequestRepository.GetRequestByIdAsync(id);
                if (getRequest.Status == true)
                {
                  var data = await _rentalRequestRepository.ChangeRequestStatus(id, false);
                    return Ok(data);
                }
                else if (getRequest.Status == false)
                {
                   var data = await _rentalRequestRepository.ChangeRequestStatus(id, true);
                    return Ok(data);
                }
                
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
            
            return NotFound();
        }

    }
}
