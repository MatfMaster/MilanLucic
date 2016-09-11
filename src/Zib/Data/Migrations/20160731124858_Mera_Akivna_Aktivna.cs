using Microsoft.EntityFrameworkCore.Migrations;

namespace Zib.Data.Migrations
{
    public partial class Mera_Akivna_Aktivna : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Akivna",
                table: "Mere");

            migrationBuilder.AddColumn<bool>(
                name: "Aktivna",
                table: "Mere",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Aktivna",
                table: "Mere");

            migrationBuilder.AddColumn<bool>(
                name: "Akivna",
                table: "Mere",
                nullable: false,
                defaultValue: false);
        }
    }
}
