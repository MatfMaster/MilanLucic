using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Zib.Data.Migrations
{
    public partial class Mere : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StatusMere",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Status = table.Column<string>(maxLength: 64, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatusMere", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mere",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Akivna = table.Column<bool>(nullable: false),
                    Grupna = table.Column<bool>(nullable: false),
                    Naziv = table.Column<string>(maxLength: 255, nullable: true),
                    Oznaka = table.Column<string>(maxLength: 64, nullable: true),
                    RokZaImplementaciju = table.Column<DateTime>(nullable: false),
                    StatusMereId = table.Column<int>(nullable: false),
                    ZaduzenZaImplementaciju = table.Column<int>(nullable: false),
                    ZaposleniZaduzenZaImplementacijuId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mere", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mere_StatusMere_StatusMereId",
                        column: x => x.StatusMereId,
                        principalTable: "StatusMere",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Mere_Zaposleni_ZaposleniZaduzenZaImplementacijuId",
                        column: x => x.ZaposleniZaduzenZaImplementacijuId,
                        principalTable: "Zaposleni",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mere_StatusMereId",
                table: "Mere",
                column: "StatusMereId");

            migrationBuilder.CreateIndex(
                name: "IX_Mere_ZaposleniZaduzenZaImplementacijuId",
                table: "Mere",
                column: "ZaposleniZaduzenZaImplementacijuId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mere");

            migrationBuilder.DropTable(
                name: "StatusMere");
        }
    }
}
