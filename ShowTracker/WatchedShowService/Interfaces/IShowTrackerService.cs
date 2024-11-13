using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchedShowService.Interfaces;

public interface IShowTrackerService
{
    public Task MarkShowWatchedAsync(int showId, string token);
    public Task MarkEpisodeWatchedAsync(int showId, int episodeId, string token);
    public Task<List<int>> GetWatchedShowsIdAsync(string token);
    public Task UnwatchEpisodeAsync(int showId, int episodeId, string token);

}
