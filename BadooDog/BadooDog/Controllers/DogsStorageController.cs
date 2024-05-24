using System.Data;
using BadooDog.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace BadooDog.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DogsStorageController: Controller
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
        string query = @"select id, name, age, image_url, description from test.dog;";

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
                mycon.Close();
            }
        }
        return new JsonResult(table);
    }
    
    [HttpPost]
    public IActionResult  Post(Dog dog)
    {
        string query = @"
                    insert into test.dog(id, name, age, image_url, description) values 
                                             (@id, @name, @age, @imageURL, @description);
        ";

        try
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BadooDogAppCon");
            //MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@id", dog.Id);
                    myCommand.Parameters.AddWithValue("@name", dog.Name);
                    myCommand.Parameters.AddWithValue("@age", dog.Age);
                    myCommand.Parameters.AddWithValue("@imageURL", dog.imageURL);
                    myCommand.Parameters.AddWithValue("@description", dog.description);

                    using (MySqlDataReader myReader = myCommand.ExecuteReader())
                    {
                        table.Load(myReader);
                        myReader.Close();
                    }
                    //myReader = myCommand.ExecuteReader();
                    mycon.Close();
                }
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
                        image_url = @imageURL,
                        description = @description
                    where id = @id;
        ";

        DataTable table = new DataTable();
        string sqlDataSource = _configuration.GetConnectionString("BadooDogAppCon");
        using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
        {
            mycon.Open();
            using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
            {
                myCommand.Parameters.AddWithValue("@id", id);
                myCommand.Parameters.AddWithValue("@name", dog.Name);
                myCommand.Parameters.AddWithValue("@age", dog.Age);
                myCommand.Parameters.AddWithValue("@imageURL", dog.imageURL);
                myCommand.Parameters.AddWithValue("@description", dog.description);

                using (MySqlDataReader myReader = myCommand.ExecuteReader())
                {
                    table.Load(myReader);
                    myReader.Close();
                }
                mycon.Close();
            }
        }
        return new JsonResult("Updated successfully");
    }
    
    [HttpDelete("id={id}")]
    public JsonResult Delete(int id)
    {
        string query = @"
                    delete from test.dog
                    where id = @id;
        ";
        
        DataTable table = new DataTable();
        string sqlDataSource = _configuration.GetConnectionString("BadooDogAppCon");
        using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
        {
            mycon.Open();
            using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
            {
                myCommand.Parameters.AddWithValue("@id", id);

                myCommand.ExecuteReader();
                
                mycon.Close();
            }
        }
        return new JsonResult("Deleted successfully");
    }
}