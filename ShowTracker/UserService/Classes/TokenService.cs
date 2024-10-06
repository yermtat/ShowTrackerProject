using AuthData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserService.Interfaces;

namespace UserService.Classes;

public class TokenService : ITokenService
{
    public Task<string> GenerateEmailTokenAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<string> GenerateRefreshTokenAsync()
    {
        throw new NotImplementedException();
    }

    public Task<string> GenerateTokenAsync(User user)
    {
        throw new NotImplementedException();
    }

    public ClaimsPrincipal GetPrincipalFromToken(string token, bool validateLifetime = false)
    {
        throw new NotImplementedException();
    }

    public Task ValidateEmailTokenAsync(string token, string userId)
    {
        throw new NotImplementedException();
    }
}
