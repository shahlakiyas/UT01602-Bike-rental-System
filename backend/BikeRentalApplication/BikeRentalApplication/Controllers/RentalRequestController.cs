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
        private readonly RentalRecordRepository _rentalRecordRepository;

        public RentalRequestController(RentalRequestRepository rentalRequestRepository, RentalRecordRepository rentalRecordRepository)
        {
            _rentalRequestRepository = rentalRequestRepository;
            _rentalRecordRepository = rentalRecordRepository;
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

        [HttpPut("Accept-Rental-Request{id}")]

        public async Task<IActionResult> AcceptRentalRequest(int id)
        {
            try
            {
                var getRequest = await _rentalRequestRepository.GetRequestByIdAsync(id);
                if (getRequest != null)
                {
                    if (getRequest.Status == false)
                    {
                        var data = await _rentalRequestRepository.AcceptRequestStatus(id);


                        RentalRecordRequest rentalRecord = new RentalRecordRequest()
                        {
                            RentalId = id
                        };

                        var record = await _rentalRecordRepository.AddRentalRecord(rentalRecord);
                        return Ok(data);
                    }
                }
                else
                {
                    return Ok(null);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NotFound();
        }

        [HttpPut("Decline-Rental-Request{id}")]
        public async Task<IActionResult> DeclineRentalRequest(int id)
        {
            try
            {
                var getRequest = await _rentalRequestRepository.GetRequestByIdAsync(id);
                if (getRequest != null)
                {
                    if (getRequest.Status == false)
                    {
                        var data = await _rentalRequestRepository.DeclineRentalRequest(id);
                    }
                }
                else
                {
                    return Ok(null);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NotFound();
        }

        [HttpGet("Get-Notifiactions{NICNo}")]

        public async Task<IActionResult> GetNotifiactions(string NICNo)
        {
            try
            {
                var data = await _rentalRequestRepository.NotifyUser(NICNo);
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex) {
                return BadRequest();
            }
            }


    }
}
