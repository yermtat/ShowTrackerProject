using AuthData.DTO;
using AuthData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserService.Interfaces;

public interface IAuthService
{
    public Task<AccessInfoDTO> LoginUserAsync(LoginDTO user);
    public Task<User> RegisterUserAsync(RegisterDTO user);
    public Task<AccessInfoDTO> RefreshTokenAsync(TokenDTO userAccessData);

    public Task LogOutAsync(TokenDTO userTokenInfo);
}
