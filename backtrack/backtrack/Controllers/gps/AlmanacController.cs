using backtrack.Models;
using backtrack.Services.gps;
using Microsoft.AspNetCore.Mvc;

namespace backtrack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlmanacController : GeneralController
    {
        private readonly AlmanacService almService;

        public AlmanacController(AlmanacService almanacService)
        {
            this.almService = almanacService;
        }

        [HttpGet("update")]
        public async Task<IActionResult> Get()
        {
            AlmanacConversions.Type alType = AlmanacConversions.Type.SEM;
            await this.almService.UpdateAlmanacAsync(alType);
            return Ok();
        }
    }
}