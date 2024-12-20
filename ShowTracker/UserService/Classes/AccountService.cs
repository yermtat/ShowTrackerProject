﻿using AuthData.Contexts;
using AuthData.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserService.Interfaces;
using static BCrypt.Net.BCrypt;

namespace UserService.Classes;

public class AccountService : IAccountService
{
    private readonly AuthContext _context;
    private readonly ITokenService _tokenService;
    private readonly IEmailSender _emailSender;

    public AccountService(AuthContext context, ITokenService tokenService, IEmailSender emailSender)
    {
        _context = context;
        _tokenService = tokenService;
        _emailSender = emailSender;
    }

    public async Task ConfirmEmailAsync(string token)
    {
    
            var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

            var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var confirmationToken = await _tokenService.GenerateEmailTokenAsync(user.Id.ToString());

            var link = $"https://localhost:7015/api/v1/Account/ValidateConfirmation?token={confirmationToken}&userId={user.Id}";

            string message = $"Please confirm your account by <a href='{link}'>clicking here</a>;.";
            await _emailSender.SendEmailAsync(user.Email, "Email confirmation", message);
    }

    public async Task<UserInfoDTO> GetUserInfoAsync(string token)
    {
        var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

        var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            throw new Exception("User not found");
        }

        return new UserInfoDTO(user.Username, user.Email, user.IsEmailConfirmed);
    }

    public async Task<IsEmailConfirmedDTO> IsEmailConfirmed(string token)
    {
        var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

        var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            throw new Exception("User not found");
        }

        return new IsEmailConfirmedDTO(user.IsEmailConfirmed);
    }

    public async Task ResetPaswordAsync(ResetPasswordDTO resetRequest, string token)
    {
        var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

        var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            throw new Exception("User not found");
        }

        if (!Verify(resetRequest.OldPassword, user.Password))
        {
            throw new Exception("Wrong password");
        }

        if (resetRequest.OldPassword == resetRequest.NewPassword)
        {
            throw new Exception("New password is the same as the old password");
        }

        if (resetRequest.NewPassword != resetRequest.ConfirmNewPassword)
        {
            throw new Exception("Passwords do not match");
        }


        user.Password = HashPassword(resetRequest.NewPassword);
        await _emailSender.SendEmailAsync(user.Email, "Password Reset", "Your password has been reset");


        await _context.SaveChangesAsync();

    }
}
