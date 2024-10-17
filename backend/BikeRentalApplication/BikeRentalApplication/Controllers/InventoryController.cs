using BikeRentalApplication.DTOs.RequestDTOs;
using BikeRentalApplication.Entities;
using BikeRentalApplication.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace BikeRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryRepository _inventoryRepository;

        public InventoryController(InventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }
        // Create Inventory Item
        [HttpPost("Create-Inventory-Item")]
        public async Task<IActionResult> CreateInventoryItem(InventoryRequest inventoryRequest)
        {
            var action = await _inventoryRepository.CreateInventoryItemAsync(inventoryRequest);
            if (action == true)
            {
                var inventoryItem = await _inventoryRepository.GetInventoryItemByRegNo(inventoryRequest.RegistrationNumber);
                return Ok(inventoryItem);
            }
            else
            {
                return BadRequest();
            }
           
        }

        // Read Inventory Item by Reg No
        [HttpGet("Get-Inventory-Items")]
        public async Task<IActionResult> GetProductById(string RegNO)
        {
            var inventoryItem = await _inventoryRepository.GetInventoryItemByRegNo(RegNO);
            if (inventoryItem == null)
            {
                return NotFound();
            }
            return Ok(inventoryItem);
        }

        [HttpGet("Get-Available-Units{id}")]

        public async Task<IActionResult> GetAvailableUnitsById(int id)
        {
            var data = await _inventoryRepository.GetAvailableUnitsByBikeId(id);
            return Ok(data);
        }
    }


}
