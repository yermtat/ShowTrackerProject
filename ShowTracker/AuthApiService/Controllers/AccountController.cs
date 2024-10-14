using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using UserService.Classes;
using UserService.Interfaces;

namespace AuthApiService.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [Authorize]
    [HttpPost("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmailAsync()
    {
        var token = HttpContext.Request.Headers["Authorization"];

        token = token.ToString().Replace("Bearer ", "");

        await _accountService.ConfirmEmailAsync(token);

        return Ok();
    }
}
