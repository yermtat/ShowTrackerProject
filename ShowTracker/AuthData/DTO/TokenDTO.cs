﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthData.DTO;

public record TokenDTO(
    string AccessToken,
    string RefreshToken
);
