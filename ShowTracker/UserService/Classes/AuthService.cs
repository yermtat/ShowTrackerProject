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
using System.Security.Claims;

namespace UserService.Classes;

public class AuthService : IAuthService
{
    private readonly AuthContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(AuthContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<AccessInfoDTO> LoginUserAsync(LoginDTO user)
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

            var tokenData = new AccessInfoDTO(
                foundUser.Username,
                await _tokenService.GenerateTokenAsync(foundUser),
                await _tokenService.GenerateRefreshTokenAsync(),
                DateTime.Now.AddDays(1)
            );

            foundUser.RefreshToken = tokenData.refreshToken;
            foundUser.RefreshTokenExpiryTime = tokenData.refreshTokenExpireTime;

            await _context.SaveChangesAsync();

            return tokenData;

    }

    public async Task LogOutAsync(TokenDTO userTokenInfo)
    {
        if (userTokenInfo is null)
            throw new Exception("Invalid client request");

        var principal = _tokenService.GetPrincipalFromToken(userTokenInfo.AccessToken);

        var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = _context.Users.FirstOrDefault(u => u.Username == username);

        user.RefreshToken = null;
        user.RefreshTokenExpiryTime = DateTime.Now;
        await _context.SaveChangesAsync();

    }

    public async Task<AccessInfoDTO> RefreshTokenAsync(TokenDTO userAccessData)
    {
        if (userAccessData is null)
            throw new Exception("Invalid client request");

        var accessToken = userAccessData.AccessToken;
        var refreshToken = userAccessData.RefreshToken;

        var principal = _tokenService.GetPrincipalFromToken(accessToken);

        var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = _context.Users.FirstOrDefault(u => u.Username == username);


        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            throw new Exception("Invalid client request");

        var newAccessToken = await _tokenService.GenerateTokenAsync(user);
        var newRefreshToken = await _tokenService.GenerateRefreshTokenAsync();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);

        await _context.SaveChangesAsync();

        var tokenData = new AccessInfoDTO(
            username,
            newAccessToken,
            newRefreshToken,
            user.RefreshTokenExpiryTime
        );

        return tokenData;
    }

    public async Task<User> RegisterUserAsync(RegisterDTO user)
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
}
