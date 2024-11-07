﻿using AuthData.DTO;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.Net;
using System.Net.Http;
using UserService.Classes;
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

            var cookieAccess = new CookieHeaderValue("accessToken", res.accessToken);
            var cookieResfresh = new CookieHeaderValue("refreshToken", res.refreshToken);

            // Define the cookie options
            var cookieOptions = new CookieOptions
            {
                Path = "/",
                HttpOnly = true,  // Cookie is only accessible via HTTP requests
                Secure = true,    // Cookie is only sent over HTTPS
                Expires = res.refreshTokenExpireTime, // Set cookie expiration
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None
            };

            // Set the cookie
            Response.Cookies.Append("accessToken", res.accessToken, cookieOptions);
            Response.Cookies.Append("refreshToken", res.refreshToken, cookieOptions);

            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpPost("Refresh")]
    public async Task<IActionResult> RefreshTokenAsync(TokenDTO refresh)
    {
        var newToken = await _authService.RefreshTokenAsync(refresh);

        if (newToken is null)
            return BadRequest("Invalid token");

        return Ok(newToken);
    }


    [Authorize]
    [HttpPost("Logout")]
    public async Task<IActionResult> LogoutAsync()
    {
        string accessToken = Request.Cookies["accessToken"];
        string refreshToken = Request.Cookies["refreshToken"];

        await _authService.LogOutAsync(new TokenDTO (accessToken, refreshToken));

        Response.Cookies.Delete("accessToken");
        Response.Cookies.Delete("refreshToken");

        return Ok("Logged out successfully");
    }
}
