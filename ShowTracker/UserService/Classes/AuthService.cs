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

namespace UserService.Classes;

public class AuthService : IAuthService
{
    private readonly AuthContext _context;

    public AuthService(AuthContext context)
    {
        _context = context;
    }

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
