﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthData.DTO;

public class TokenDTO
{
    public string RefreshToken { get; set; }
    public string AccessToken { get; set; }
}
