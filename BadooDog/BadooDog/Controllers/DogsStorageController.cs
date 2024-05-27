using System.Data;
using BadooDog.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;

namespace BadooDog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DogsStorageController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<DogsStorageController> _logger;

        public DogsStorageController(IConfiguration configuration, ILogger<DogsStorageController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select id, name, age, image_url, description, price, type_, gender from test.dog;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BadooDogAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
public IActionResult Post(Dog dog)
{
    string query = @"
        insert into test.dog(name, age, image_url, description, price, type_, gender) 
        values (@name, @age, @image_url, @description, @price, @type_, @gender);
    ";

    try
    {
        string sqlDataSource = _configuration.GetConnectionString("BadooDogAppCon");
        using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
        {
            mycon.Open();
            using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
            {
                myCommand.Parameters.AddWithValue("@name", dog.Name);
                myCommand.Parameters.AddWithValue("@age", dog.Age);
                // Combine all imageURLs into a single string with commas
                string imageURLString = string.Join(",", dog.ImageURL);
                myCommand.Parameters.AddWithValue("@image_url", imageURLString);
                myCommand.Parameters.AddWithValue("@description", dog.Description);
                myCommand.Parameters.AddWithValue("@price", dog.Price);
                myCommand.Parameters.AddWithValue("@type_", dog.Type_);
                myCommand.Parameters.AddWithValue("@gender", dog.Gender);

                myCommand.ExecuteNonQuery();
            }
            mycon.Close();
        }
        return Ok("Added successfully");
    }
    catch (MySqlException e)
    {
        _logger.LogError(e.Message);
        return StatusCode(500, e.Message);
    }
}


        [HttpPut("id={id}")]
        public JsonResult Put(int id, Dog dog)
        {
            string query = @"
                update test.dog
                set name = @name, 
                    age = @age,
                    image_url = @image_url,
                    description = @description,
                    price = @price,
                    type_ = @type_,
                    gender = @gender
                where id = @id;
            ";

            string sqlDataSource = _configuration.GetConnectionString("BadooDogAppCon");
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@name", dog.Name);
                    myCommand.Parameters.AddWithValue("@age", dog.Age);
                    myCommand.Parameters.AddWithValue("@image_url", string.Join(",", dog.ImageURL));
                    myCommand.Parameters.AddWithValue("@description", dog.Description);
                    myCommand.Parameters.AddWithValue("@price", dog.Price);
                    myCommand.Parameters.AddWithValue("@type_", dog.Type_);
                    myCommand.Parameters.AddWithValue("@gender", dog.Gender);

                    myCommand.ExecuteNonQuery();
                }
                mycon.Close();
            }
            return new JsonResult("Updated successfully");
        }
    }
}
