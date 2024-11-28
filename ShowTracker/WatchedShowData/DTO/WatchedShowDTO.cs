using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchedShowData.DTO;

public record WatchedShowDTO
(
    bool isWatched,
    List<int> watchedEpisodes,
    bool isWatchLater,
    bool isFavourite
);
