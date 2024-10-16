using BikeRentalApplication.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BikeRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalRecordController : ControllerBase
    {
        private RentalRecordRepository _recordRepository;

        public RentalRecordController(RentalRecordRepository recordRepository)
        {
            _recordRepository = recordRepository;
        }


        [HttpGet("Get-Records-For-Portal")]
        public async Task<IActionResult> GetRecordsForPortal()
        {
            var data = await _recordRepository.GetRentalRecordsforPortal();
            return Ok(data);
        }

        [HttpGet("Get-Records-For-Return")]

        public async Task<IActionResult> GetRentalRecordsforReturn()
        {
            var data = await _recordRepository.GetRentalRecordsforReturn();
            return Ok(data);
        }
        [HttpGet]

        public async Task<IActionResult> GetRentalPayment(int recordId)
        {
            var data = await _recordRepository.GetRentalPayment(recordId);
            return Ok(data);
        }

        [HttpGet("Complete-Rental-Record")]

        public async Task<IActionResult> CompleteRentalRecord(decimal payment, int RecordId)
        {
            var data = await _recordRepository.CompleteRentalRecord(payment, RecordId);
            return Ok(data);
        }

        [HttpPut("Update-Rental-Out")]

        public async Task<IActionResult> UpdateRentalOutTime(DateTime outTime, string BikeRegNo, int RecordId)
        {
            var data = await _recordRepository.UpdateRentalOut(outTime, BikeRegNo, RecordId);
            return Ok(data);
        }



        [HttpGet("Get-records-of-A-User")]
        public async Task<IActionResult> GetRecordsOfAUser(string NICNo)
        {
            var data = await _recordRepository.GetRecordsOfUser(NICNo);
            return Ok(data);
        }

        [HttpGet("Get-Rental-records")]
        public async Task<IActionResult> GetRecordsForTable()
        {
            var data = await _recordRepository.GetAllRentalRecords();
            return Ok(data);
        }

        [HttpGet("Get-OverDue-Rentals")]
        public async Task<IActionResult> GetOverDueRentals()
        {
            var data = await _recordRepository.GetOverDueRentals();
            return Ok(data);
        }



    }
}
