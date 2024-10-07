using BikeRentalApplication.Entities;
using BikeRentalApplication.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BikeRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;


        public UserController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // Create User
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            var NICNo = await _userRepository.CreateUserAsync(user);
            return Ok(NICNo);
        }
    }
}
