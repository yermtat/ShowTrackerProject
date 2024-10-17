using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WatchedShowData.Models;

namespace WatchedShowData.Contexts;

public partial class ShowTrackerDbContext : DbContext
{
    public ShowTrackerDbContext()
    {
    }

    public ShowTrackerDbContext(DbContextOptions<ShowTrackerDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<WatchedEpisode> WatchedEpisodes { get; set; }

    public virtual DbSet<WatchedShow> WatchedShows { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<WatchedEpisode>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__WatchedE__3214EC079007AEB3");

            entity.HasOne(d => d.WatchedShow).WithMany(p => p.WatchedEpisodes)
                .HasForeignKey(d => d.WatchedShowId)
                .HasConstraintName("FK__WatchedEp__Watch__398D8EEE");
        });

        modelBuilder.Entity<WatchedShow>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__WatchedS__3214EC07C1201917");

            entity.Property(e => e.ShowId).HasColumnName("ShowID");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
