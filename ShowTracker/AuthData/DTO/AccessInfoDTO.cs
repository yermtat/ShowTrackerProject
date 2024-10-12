using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthData.DTO;

public class AccessInfoDTO
{
    public string Username { get; set; }
    public  string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public DateTime RefreshTokenExpireTime { get; set; }
}
