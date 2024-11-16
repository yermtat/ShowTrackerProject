using AuthData.Contexts;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserService.Interfaces;
using WatchedShowData.Contexts;
using WatchedShowData.DTO;
using WatchedShowData.Models;
using WatchedShowService.Interfaces;

namespace WatchedShowService.Classes;

public class ShowTrackerService : IShowTrackerService
{
    private readonly ShowTrackerDbContext _showTrackerContext;
    private readonly AuthContext _authContext;
    private readonly ITokenService _tokenService;

    public ShowTrackerService(ShowTrackerDbContext showTrackerContext, AuthContext authContext, ITokenService tokenService)
    {
        _showTrackerContext = showTrackerContext;
        _authContext = authContext;
        _tokenService = tokenService;
    }

    public async Task MarkEpisodeWatchedAsync(int showId, int episodeId, string token)
    {
        try
        {
            var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

            var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var watchedShow = await _showTrackerContext.WatchedShows.FirstOrDefaultAsync(s => s.ShowId == showId && s.UserId == user.Id);

            if (watchedShow == null)
            {
                watchedShow = new WatchedShow { ShowId = showId, UserId = user.Id };
                await _showTrackerContext.WatchedShows.AddAsync(watchedShow);
                await _showTrackerContext.SaveChangesAsync();
            }

            var watchedEpisode = new WatchedEpisode { WatchedShowId = watchedShow.Id, EpisodeId = episodeId };
            await _showTrackerContext.WatchedEpisodes.AddAsync(watchedEpisode);
            await _showTrackerContext.SaveChangesAsync();



        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

    public async Task MarkShowWatchedAsync(int showId, string token)
    {
        try
        {
            var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

            var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var watchedShow = new WatchedShow { ShowId = showId, UserId = user.Id };
            await _showTrackerContext.WatchedShows.AddAsync(watchedShow);
            await _showTrackerContext.SaveChangesAsync();

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<List<int>> GetWatchedShowsIdAsync(string token)
    {
        try
        {
            var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

            var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var shows = _showTrackerContext.WatchedShows.Where(u => u.UserId == user.Id).Select(s => s.ShowId).ToList();

            return shows;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task UnwatchEpisodeAsync(int showId, int episodeId, string token)
    {
        try
        {
            var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

            var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var watchedShow = await _showTrackerContext.WatchedShows.FirstOrDefaultAsync(s => s.ShowId == showId && s.UserId == user.Id);

            if (watchedShow == null)
            {
                throw new Exception("Show not found");
            }

            await _showTrackerContext.WatchedEpisodes.Where(e => e.EpisodeId == episodeId && e.WatchedShowId == watchedShow.Id).ExecuteDeleteAsync();

        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

    public async Task<WatchedShowDTO> GetWatchedShowInfoAsync(int showId, string token)
    {
        try
        {


            var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

            var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var show = await _showTrackerContext.WatchedShows.FirstOrDefaultAsync(s => s.UserId == user.Id && s.ShowId == showId);

            if (show == null) return new WatchedShowDTO(0, new List<int>());

            var episodes = await _showTrackerContext.WatchedEpisodes.Where(s => s.WatchedShowId == show.Id).Select(e => e.EpisodeId).ToListAsync();

            return new WatchedShowDTO(showId, episodes);

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task UnwatchShowAsync(int showId, string token)
    {
        try
        {


            var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

            var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                throw new Exception("User not found");
            }
            

            await _showTrackerContext.WatchedShows.Where(s => s.ShowId == showId).ExecuteDeleteAsync();

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
