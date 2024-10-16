using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchedShowService.Interfaces;

public interface IShowTrackerService
{
    public Task MarkWatchedAsync(int showId, string token);
}
