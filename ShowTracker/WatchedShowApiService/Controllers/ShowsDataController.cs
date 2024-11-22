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

        try {

         var username = HttpContext.Request.Cookies["username"];

         await _showTrackerService.MarkShowWatchedAsync(ShowId, username);

         return Ok();
         
        }catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpPost("MarkWatched/{showId}/{episodeId}")]
    public async Task<IActionResult> MarkEpisodeWatchedAsync(int showId, int episodeId)
    {
        try {
            var username = HttpContext.Request.Cookies["username"];

            await _showTrackerService.MarkEpisodeWatchedAsync(showId, episodeId, username);

            return Ok();
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    [Authorize]
    [HttpPost("Unwatch/{showId}/{episodeId}")]
    public async Task<IActionResult> UnwatchEpisodeAsync(int showId, int episodeId)
    {
        try
        {
            var username = HttpContext.Request.Cookies["username"];

            await _showTrackerService.UnwatchEpisodeAsync(showId, episodeId, username);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }



    [Authorize]
    [HttpGet("GetWatchedShows")]
    public async Task<IActionResult> GetWatchedShowsAsync()
    {
        try
        {
            var username = HttpContext.Request.Cookies["username"];

            var res = await _showTrackerService.GetWatchedShowsIdAsync(username);

            return Ok(res);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpGet("GetInfo/{showId}")]
    public async Task<IActionResult> GetWatchedShowInfoAsync(int showId)
    {
        try
        {
            var username = HttpContext.Request.Cookies["username"];

            var res = await _showTrackerService.GetWatchedShowInfoAsync(showId, username);

            return Ok(res);

        } catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }


    }

    [Authorize]
    [HttpPost("Unwatch/{showId}")]
    public async Task<IActionResult> UnwatchShowAsync(int showId)
    {
        try
        {
            var username = HttpContext.Request.Cookies["username"];

            await _showTrackerService.UnwatchShowAsync(showId, username);

            return Ok();

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}
