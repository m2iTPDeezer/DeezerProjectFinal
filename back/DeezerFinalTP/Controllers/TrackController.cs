using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeezerFinalTP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class TrackController : ControllerBase
    {

        private DataDbContext data;

        public ContactController(DataDbContext _data)
        {
            data = _data;
        }


        // GET: api/Track
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(data.Users.ToList());
        }

        // GET: api/Track/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Track
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Track/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
