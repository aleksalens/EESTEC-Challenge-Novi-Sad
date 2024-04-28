using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MichTeachBackend.Migrations
{
    /// <inheritdoc />
    public partial class passwordname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "UserPassword");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserPassword",
                table: "Users",
                newName: "Password");
        }
    }
}
