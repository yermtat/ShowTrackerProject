﻿using System;
using System.Collections.Generic;

namespace WatchedShowData.Models;

public partial class WatchedShow
{
    public int Id { get; set; }

    public Guid UserId { get; set; }

    public int ShowId { get; set; }
    public bool IsFavorite { get; set; }

    public virtual ICollection<WatchedEpisode> WatchedEpisodes { get; set; } = new List<WatchedEpisode>();
}
