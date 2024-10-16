using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchedShowData.DTO;

public record WatchedShowDTO(
    Guid userId,
    int showId);
