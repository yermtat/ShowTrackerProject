﻿using Microsoft.AspNetCore.Authorization;
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
    private readonly ITokenService _tokenService;

    public AccountController(IAccountService accountService, ITokenService tokenService)
    {
        _accountService = accountService;
        _tokenService = tokenService;
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

    [HttpGet("ValidateConfirmation")]
    public async Task<IActionResult> ValidateConfirmationAsync([FromQuery] string token, [FromQuery] string userId)
    {

        await _tokenService.ValidateEmailTokenAsync(token, userId);

        return Ok("Email confirmed successfully");
    }

}
