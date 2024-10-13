using AuthData.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Interfaces;
using UserService.Validators;

namespace AuthApiService.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly LoginUserValidator _loginUserValidador;
    private readonly RegisterUserValidator _registerUserValidator;

    public AuthController(IAuthService authService, LoginUserValidator loginUserValidador, RegisterUserValidator registerUserValidator)
    {
        _authService = authService;
        _loginUserValidador = loginUserValidador;
        _registerUserValidator = registerUserValidator;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterDTO user)
    {
        try { 
        var validationRes = _registerUserValidator.Validate(user);
        if (!validationRes.IsValid)
        {
            return BadRequest(validationRes.Errors);
        }

        var res = await _authService.RegisterUserAsync(user);
        return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("Login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginDTO user)
    {
        try
        {
            var validationRes = _loginUserValidador.Validate(user);
            if (!validationRes.IsValid)
            {
                return BadRequest(validationRes.Errors);
            }

            var res = await _authService.LoginUserAsync(user);

            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
