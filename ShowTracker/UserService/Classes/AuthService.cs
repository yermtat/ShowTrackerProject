using AuthData.DTO;
using AuthData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserService.Interfaces;

namespace UserService.Classes;

internal class AuthService : IAuthService
{
    public Task<AccessInfoDTO> LoginUserAsync(LoginDTO user)
    {
        throw new NotImplementedException();
    }

    public Task LogOutAsync(TokenDTO userTokenInfo)
    {
        throw new NotImplementedException();
    }

    public Task<AccessInfoDTO> RefreshTokenAsync(TokenDTO userAccessData)
    {
        throw new NotImplementedException();
    }

    public Task<User> RegisterUserAsync(RegisterDTO user)
    {
        throw new NotImplementedException();
    }
}
