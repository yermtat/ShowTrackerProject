using AuthData.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using UserService.Classes;
using System.Text;
using UserService.Interfaces;
using WatchedShowData.Contexts;
using WatchedShowService.Classes;
using WatchedShowService.Interfaces;
using AuthData.DTO;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http.Extensions;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using ExceptionService.Middlwares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ShowTrackerDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("WatchedShows"));
});
builder.Services.AddDbContext<AuthContext>(options =>
{

    options.UseSqlServer(builder.Configuration.GetConnectionString("AuthDB"));
});


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.SetIsOriginAllowed(origin => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});


builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.None;
    options.HttpOnly = HttpOnlyPolicy.Always;
    options.Secure = CookieSecurePolicy.Always;
});


builder.Services.AddHttpClient("MyClient");


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateActor = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        RequireExpirationTime = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Value,
        ValidAudience = builder.Configuration.GetSection("Jwt:Audience").Value,
        IssuerSigningKey =
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt:Key").Value))
    };



    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.HttpContext.Request.Cookies["accessToken"];
            if (!string.IsNullOrEmpty(accessToken))
            {
                context.Token = accessToken;
                context.HttpContext.Request.Headers["Authorization"] = $"Bearer {accessToken}";
            }

            return Task.CompletedTask;
        },
        OnAuthenticationFailed = async context =>
        {
            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
            {
                var httpContext = context.HttpContext;

                var accessToken =
                    httpContext.Request.Cookies["accessToken"];

                var refreshToken =
                    httpContext.Request.Cookies["refreshToken"];

                if (!string.IsNullOrEmpty(refreshToken))
                {
                    var refreshEndpoint =
                        "https://localhost:7015/api/v1/Auth/Refresh";
                    var client = httpContext.RequestServices.GetRequiredService<IHttpClientFactory>().CreateClient();

                    var response = await client.PostAsJsonAsync(refreshEndpoint, new TokenDTO(accessToken, refreshToken));

                    if (response.IsSuccessStatusCode)
                    {
                        var newTokens = await response.Content.ReadFromJsonAsync<TokenDTO>();
                        if (newTokens != null)
                        {
                            //var cookieOptions = new CookieOptions
                            //{
                            //    Path = "/",
                            //    HttpOnly = true,  // Cookie is only accessible via HTTP requests
                            //    Secure = true,    // Cookie is only sent over HTTPS
                            //    Expires = DateTime.UtcNow.AddDays(1), // Set cookie expiration
                            //    SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None
                            //};

                            httpContext.Response.Cookies.Append("accessToken", newTokens.AccessToken);
                            httpContext.Response.Cookies.Append("refreshToken", newTokens.RefreshToken);


                            httpContext.Request.Headers["Authorization"] = $"Bearer {newTokens.AccessToken}";

                            //context.HttpContext.Features.Set(
                            //    new TokenValidatedContext(context.HttpContext, context.Scheme, context.Options)
                            //    {
                            //        Principal = context.Principal,
                            //        SecurityToken = new JwtSecurityToken(newTokens.AccessToken)
                            //    });


                            //var originalRequest = httpContext.Request;
                            //var retryClient = httpContext.RequestServices.GetRequiredService<IHttpClientFactory>().CreateClient();

                            //// Создаем новый запрос с обновленным accessToken
                            //var retryRequest = new HttpRequestMessage(new HttpMethod(originalRequest.Method), originalRequest.GetDisplayUrl())
                            //{
                            //    Content = originalRequest.HasFormContentType
                            //              ? new FormUrlEncodedContent(originalRequest.Form.ToDictionary(x => x.Key, x => x.Value.ToString()))
                            //              : null
                            //};
                            //retryRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", newTokens.AccessToken);

                            //// Выполняем повторный запрос
                            //var retryResponse = await retryClient.SendAsync(retryRequest);

                            //// Завершаем текущий pipeline с результатом повторного запроса
                            //httpContext.Response.StatusCode = (int)retryResponse.StatusCode;
                            //await retryResponse.Content.CopyToAsync(httpContext.Response.Body);


                            // Повторно валидируем токен
                            var tokenHandler = new JwtSecurityTokenHandler();
                            var validationParameters = context.Options.TokenValidationParameters;

                            var principal = tokenHandler.ValidateToken(newTokens.AccessToken, validationParameters, out var validatedToken);

                            if (validatedToken is JwtSecurityToken jwt && jwt.RawData == newTokens.AccessToken)
                            {
                                httpContext.User = principal; // Устанавливаем Principal в HttpContext
                                return; // Продолжаем обработку запроса
                            }

                        }

                    }



                }
            }
        }
    };

}
);

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddScoped<IShowTrackerService, ShowTrackerService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<GlobalExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCookiePolicy();

app.UseCors();

app.UseHttpsRedirection();
app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
