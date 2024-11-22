using AuthData.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Text.Json;
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
    [HttpPost("MarkWatched/{ShowId}")]
    public async Task<IActionResult> MarkShowWatchedAsync(int ShowId )
    {


         var username = HttpContext.Request.Cookies["username"];

         await _showTrackerService.MarkShowWatchedAsync(ShowId, username);

         return Ok();
         
    }

    [Authorize]
    [HttpPost("MarkWatched/{showId}/{episodeId}")]
    public async Task<IActionResult> MarkEpisodeWatchedAsync(int showId, int episodeId)
    {

            var username = HttpContext.Request.Cookies["username"];

            await _showTrackerService.MarkEpisodeWatchedAsync(showId, episodeId, username);

            return Ok();

    }

    [Authorize]
    [HttpPost("Unwatch/{showId}/{episodeId}")]
    public async Task<IActionResult> UnwatchEpisodeAsync(int showId, int episodeId)
    {

            var username = HttpContext.Request.Cookies["username"];

            await _showTrackerService.UnwatchEpisodeAsync(showId, episodeId, username);

            return Ok();


    }



    [Authorize]
    [HttpGet("GetWatchedShows")]
    public async Task<IActionResult> GetWatchedShowsAsync()
    {

            var username = HttpContext.Request.Cookies["username"];

            var res = await _showTrackerService.GetWatchedShowsIdAsync(username);

            return Ok(res);


    }

    [Authorize]
    [HttpGet("GetInfo/{showId}")]
    public async Task<IActionResult> GetWatchedShowInfoAsync(int showId)
    {
            var username = HttpContext.Request.Cookies["username"];

            var res = await _showTrackerService.GetWatchedShowInfoAsync(showId, username);

            return Ok(res);

    }

    [Authorize]
    [HttpPost("Unwatch/{showId}")]
    public async Task<IActionResult> UnwatchShowAsync(int showId)
    {

            var username = HttpContext.Request.Cookies["username"];

            await _showTrackerService.UnwatchShowAsync(showId, username);

            return Ok();

    }

}
