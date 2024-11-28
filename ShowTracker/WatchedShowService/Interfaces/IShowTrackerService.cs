using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchedShowData.DTO;
using WatchedShowData.Models;

namespace WatchedShowService.Interfaces;

public interface IShowTrackerService
{
    public Task MarkShowWatchedAsync(int showId, string username);
    public Task MarkEpisodeWatchedAsync(int showId, int episodeId, string username);
    public Task<List<int>> GetWatchedShowsIdAsync(string username);
    public Task UnwatchEpisodeAsync(int showId, int episodeId, string username);
    public Task<WatchedShowDTO> GetWatchedShowInfoAsync(int showId, string username);
    public Task UnwatchShowAsync(int showId, string username);
    public Task AddToWatchLaterAsync(int shwowId, string username);

    public Task<List<int>> GetWatchLaterShowsIdAsync(string username);
    public Task DeleteFromWatchLaterAsync(int showId, string username);

    public Task AddToFavouriteAsync( int showId, string username);
    public Task DeleteFromFavouriteAsync(int  showId, string username);
    public Task<List<int>> GetFavouriteShowsIdAsync(string username);
}
