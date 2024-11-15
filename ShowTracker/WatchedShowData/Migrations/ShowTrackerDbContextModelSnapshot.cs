﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WatchedShowData.Contexts;

#nullable disable

namespace WatchedShowData.Migrations
{
    [DbContext(typeof(ShowTrackerDbContext))]
    partial class ShowTrackerDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WatchedShowData.Models.WatchedEpisode", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("EpisodeId")
                        .HasColumnType("int");

                    b.Property<int>("WatchedShowId")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__WatchedE__3214EC079007AEB3");

                    b.HasIndex("WatchedShowId");

                    b.ToTable("WatchedEpisodes");
                });

            modelBuilder.Entity("WatchedShowData.Models.WatchedShow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ShowId")
                        .HasColumnType("int")
                        .HasColumnName("ShowID");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("UserID");

                    b.HasKey("Id")
                        .HasName("PK__WatchedS__3214EC07C1201917");

                    b.ToTable("WatchedShows");
                });

            modelBuilder.Entity("WatchedShowData.Models.WatchedEpisode", b =>
                {
                    b.HasOne("WatchedShowData.Models.WatchedShow", "WatchedShow")
                        .WithMany("WatchedEpisodes")
                        .HasForeignKey("WatchedShowId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__WatchedEp__Watch__398D8EEE");

                    b.Navigation("WatchedShow");
                });

            modelBuilder.Entity("WatchedShowData.Models.WatchedShow", b =>
                {
                    b.Navigation("WatchedEpisodes");
                });
#pragma warning restore 612, 618
        }
    }
}