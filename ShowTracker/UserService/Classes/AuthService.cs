using AuthData.DTO;
using AuthData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserService.Interfaces;
using static BCrypt.Net.BCrypt;
using AuthData.Contexts;
using AuthData.DTO;
using AuthData.Models;
using Microsoft.EntityFrameworkCore;

namespace UserService.Classes;

public class AuthService : IAuthService
{
    private readonly AuthContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(AuthContext context)
    {
        _context = context;
    }

    public async Task<AccessInfoDTO> LoginUserAsync(LoginDTO user)
    {
        try
        {
            var foundUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);

            if (foundUser == null)
            {
                throw new Exception( "User not found");
            }

            if (!Verify(user.Password, foundUser.Password))
            {
                throw new Exception("Invalid credentials");
            }

            var tokenData = new AccessInfoDTO
            {
                Username = foundUser.Username,
                AccessToken = await _tokenService.GenerateTokenAsync(foundUser),
                RefreshToken = await _tokenService.GenerateRefreshTokenAsync(),
                RefreshTokenExpireTime = DateTime.Now.AddDays(1)
            };

            foundUser.RefreshToken = tokenData.RefreshToken;
            foundUser.RefreshTokenExpiryTime = tokenData.RefreshTokenExpireTime;

            await _context.SaveChangesAsync();

            return tokenData;
        }
        catch
        {
            throw;
        }
    }

    public Task LogOutAsync(TokenDTO userTokenInfo)
    {
        throw new NotImplementedException();
    }

    public Task<AccessInfoDTO> RefreshTokenAsync(TokenDTO userAccessData)
    {
        throw new NotImplementedException();
    }

    public async Task<User> RegisterUserAsync(RegisterDTO user)
    {
        try
        {
            var newUser = new User
            {
                Username = user.Username,
                Email = user.Email,
                Password = HashPassword(user.Password)
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return newUser;

        }
        catch
        {
            throw;
        }
    }
}
