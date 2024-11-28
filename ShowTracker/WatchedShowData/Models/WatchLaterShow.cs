using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchedShowData.Models;

public class WatchLaterShow
{
    public int Id { get; set; }

    public Guid UserId { get; set; }

    public int ShowId { get; set; }
}
