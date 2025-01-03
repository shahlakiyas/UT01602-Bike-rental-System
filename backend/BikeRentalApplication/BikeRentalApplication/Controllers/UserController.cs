﻿using BikeRentalApplication.DTOs.RequestDTOs;
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
        public async Task<IActionResult> CreateUser(UserRequest user)
        {
            var NICNo = await _userRepository.CreateUserAsync(user);
            return Ok(NICNo);
        }
        [HttpGet("Log-In")]

        public async Task<IActionResult> LogIn(string NICno, string Password)
        {
            try
            {
                var data = await _userRepository.LogIn(NICno, Password);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Read User by id 
        [HttpGet]
        public async Task<IActionResult> GetUserByIdAsync(string NIC)
        {
            var user = await _userRepository.GetUserByIdAsync(NIC);
            return Ok(user);
        }

        //Read Users
        [HttpGet("Get-All-Users")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return Ok(users);
        }

        //Update User
        [HttpPut("Upadate-User")]
        public async Task<IActionResult> UpdateUserAsync(string NIC, UserRequest user)
        {
            try
            {
                var check = await _userRepository.GetUserByIdAsync(NIC);

                if (check != null)
                {
                    var userUpdate = await _userRepository.UpdateUserAsync(NIC, user);
                    return Ok(userUpdate);

                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            };


        }


    }
}
