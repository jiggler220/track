using backtrack.Models.gps;
using backtrack.Services.gps;
using Microsoft.AspNetCore.Mvc;

namespace backtrack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GPSController : GeneralController
    {
        private readonly AlmanacService almService;

        public GPSController(AlmanacService almanacService)
        {
            this.almService = almanacService;
        }

        [HttpGet(Name = "GetAlamanac")]
        public async Task<IActionResult> Get()
        {
            string item = await this.almService.GetMostRecentAlmanacAsync(AlmanacType.Type.SEM);
            return Ok(item);
        }
    }
}