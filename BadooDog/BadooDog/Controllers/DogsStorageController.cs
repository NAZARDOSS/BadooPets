using System.Data;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace BadooDog.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DogsStorageController: Controller
{
    private readonly IConfiguration _configuration;

    public DogsStorageController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet]
    public JsonResult Get()
    {
        string query = @"select id, name, age from test.dog;";

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
}