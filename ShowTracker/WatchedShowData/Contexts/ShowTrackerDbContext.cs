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
            entity.HasNoKey();

            entity.HasOne(d => d.WatchedShow).WithMany()
                .HasForeignKey(d => d.WatchedShowId)
                .HasConstraintName("FK__WatchedEp__Watch__38996AB5");
        });

        modelBuilder.Entity<WatchedShow>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__WatchedS__3214EC070C2B36EA");

            entity.Property(e => e.ShowId).HasColumnName("ShowID");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
