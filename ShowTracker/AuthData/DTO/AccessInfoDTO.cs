using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthData.DTO;

public record AccessInfoDTO(

    string userName,
    string accessToken,
    string refreshToken,
    DateTime refreshTokenExpireTime
);