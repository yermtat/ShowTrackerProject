using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AuthData.DTO;

namespace UserService.Interfaces;

public interface IAccountService
{
    public Task ResetPaswordAsync(ResetPasswordDTO resetRequest, string token);
    public Task ConfirmEmailAsync(string token);

    public Task<IsEmailConfirmedDTO> IsEmailConfirmed(string token);
    public Task<UserInfoDTO> GetUserInfoAsync(string token);
}
