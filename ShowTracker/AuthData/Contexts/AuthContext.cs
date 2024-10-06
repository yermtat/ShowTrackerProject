using AuthData.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace AuthData.Contexts;

internal class AuthContext : DbContext
{
    public AuthContext()
    {
    }

    public AuthContext(DbContextOptions<AuthContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var userEntity = modelBuilder.Entity<User>();
        userEntity.HasKey(u => u.Id); 

        userEntity.Property(u => u.Username)
            .IsRequired();
        userEntity.HasIndex(u => u.Username)
                .IsUnique();

        userEntity.Property(u => u.Email)
                .IsRequired();
        userEntity.HasIndex(u => u.Email)
                .IsUnique();

        userEntity.Property(u => u.Password)
                .IsRequired();
    }
}
