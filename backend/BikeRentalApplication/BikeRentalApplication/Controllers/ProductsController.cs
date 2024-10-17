using BikeRentalApplication.Dbset;
using BikeRentalApplication.Entities;
using BikeRentalApplication.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BikeRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductRepository _productsRepository;
      

        public ProductsController(ProductRepository productsRepository)
        {
            _productsRepository = productsRepository;
        }

        // Create Product
        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            var productId = await _productsRepository.CreateProductAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { id = productId }, product);
        }

        // Read Product by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productsRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // Read All Products
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productsRepository.GetAllProductsAsync();
            return Ok(products);
        }

        // Update Product
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            var updated = await _productsRepository.UpdateProductAsync(product);
            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        // Delete Product
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var deleted = await _productsRepository.DeleteProductAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }

        //[HttpPost("DB-set")]
        //public async Task<IActionResult> SetupDb()
        //{
        //    var dBname = await _dbset.CreateTable();
        //    return Ok(dBname);
        //}
    }
}
