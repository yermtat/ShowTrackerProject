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
                        $"{httpContext.Request.Scheme}://{httpContext.Request.Host}/api/v1/Auth/Refresh";
                    var client = httpContext.RequestServices.GetRequiredService<IHttpClientFactory>().CreateClient();

                    var response = await client.PostAsJsonAsync(refreshEndpoint, new TokenDTO(accessToken, refreshToken));

                    if (response.IsSuccessStatusCode)
                    {
                        var newTokens = await response.Content.ReadFromJsonAsync<TokenDTO>();
                        if (newTokens != null)
                        {
                            httpContext.Response.Cookies.Append("accessToken", newTokens.AccessToken);
                            httpContext.Response.Cookies.Append("refreshToken", newTokens.RefreshToken);


                            httpContext.Request.Headers["Authorization"] = $"Bearer {newTokens.AccessToken}";

                            context.HttpContext.Features.Set(
                                new TokenValidatedContext(context.HttpContext, context.Scheme, context.Options)
                                {
                                    Principal = context.Principal,
                                    SecurityToken = new JwtSecurityToken(newTokens.AccessToken)
                                });
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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
