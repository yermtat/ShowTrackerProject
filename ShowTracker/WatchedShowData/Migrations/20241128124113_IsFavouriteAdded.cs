using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchedShowData.Migrations
{
    /// <inheritdoc />
    public partial class IsFavouriteAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFavourite",
                table: "WatchedShows",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFavourite",
                table: "WatchedShows");
        }
    }
}
