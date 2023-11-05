using backtrack.Models;
using backtrack.Services.gps;
using Microsoft.AspNetCore.Mvc;

namespace backtrack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SvController : GeneralController
    {
        private readonly AlmanacService almService;

        public SvController(AlmanacService almanacService)
        {
            this.almService = almanacService;
        }

        [HttpGet("gpsSvs")]
        public async Task<IActionResult> GetCurrentSvs()
        {
            if (this.almService.currentSem == "" && this.almService.currentYuma == "")
            {
                await this.almService.UpdateAlmanacAsync(AlmanacConversions.Type.SEM);
            }

            Dictionary<int, Satellite> currentSvs = this.almService.ComputeConstellationCoords(DateTime.UtcNow);
            return Ok(currentSvs);
        }
    }
}