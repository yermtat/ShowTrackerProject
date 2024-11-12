using AuthData.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
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
         var token = HttpContext.Request.Headers["Authorization"];

         token = token.ToString().Replace("Bearer ", "");

         await _showTrackerService.MarkShowWatchedAsync(ShowId, token);

         return Ok();
         
        }catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpPost("MarkWatched/{showId}/{seasonNumber}/{episodeNumber}")]
    public async Task<IActionResult> MarkEpisodeWatchedAsync(int showId, int seasonNumber, int episodeNumber)
    {
        try { 
            var token = HttpContext.Request.Headers["Authorization"];

            token = token.ToString().Replace("Bearer ", "");

            await _showTrackerService.MarkEpisodeWatchedAsync(showId, seasonNumber, episodeNumber, token);

            return Ok();
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    [Authorize]
    [HttpGet("GetWatchedShows")]
    public async Task<IActionResult> GetWatchedShowAsync()
    {
        try
        {
            var token = HttpContext.Request.Headers["Authorization"];

            token = token.ToString().Replace("Bearer ", "");

            var res = await _showTrackerService.GetWatchedShowsIdAsync(token);

            return Ok(res);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpGet("GetWatchedEpisodes")]
    public async Task<IActionResult> GetWatchedEpisodes()
    {
        return Ok();
    }
}
