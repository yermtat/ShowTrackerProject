using AuthData.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserService.Interfaces;
using WatchedShowData.Contexts;
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

    public async Task MarkWatchedAsync(int showId, string token)
    {
        var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

        var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            throw new Exception("User not found");
        }

        var watchedShow = new WatchedShow { ShowId = showId, UserId = user.Id};
        await _showTrackerContext.WatchedShows.AddAsync(watchedShow);
        await _showTrackerContext.SaveChangesAsync();
    }
}
