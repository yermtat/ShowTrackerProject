using AuthData.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WatchedShowData.Contexts;
using WatchedShowData.DTO;
using WatchedShowService.Interfaces;

namespace WatchedShowApiService.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class ShowsDataController : ControllerBase
{
    private readonly IShowTrackerService _showTrackerService;

    public ShowsDataController(IShowTrackerService showTrackerService)
    {
        _showTrackerService = showTrackerService;
    }

    [Authorize]
    [HttpPost("MarkAsWatched")]
    public async Task<IActionResult> MarkWatchedAsync(int ShowId )
    {
        var token = HttpContext.Request.Headers["Authorization"];

        token = token.ToString().Replace("Bearer ", "");

        await _showTrackerService.MarkWatchedAsync(ShowId, token);

        return Ok();
    }

}
