using System;
using System.Collections.Generic;

namespace WatchedShowData.Models;

public partial class WatchedEpisode
{
    public int Id { get; set; }

    public int WatchedShowId { get; set; }

    public int Season { get; set; }

    public int Episode { get; set; }

    public virtual WatchedShow WatchedShow { get; set; } = null!;
}
