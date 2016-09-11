using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Zib.Data.Migrations
{
    public partial class PretnjeRanjivosti_DefaultMere : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PretnjeRanjivosti_DefaultMere",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MeraId = table.Column<int>(nullable: false),
                    PretnjeRanjivostiId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PretnjeRanjivosti_DefaultMere", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PretnjeRanjivosti_DefaultMere_Mere_MeraId",
                        column: x => x.MeraId,
                        principalTable: "Mere",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PretnjeRanjivosti_DefaultMere_PretnjeRanjivosti_PretnjeRanjivostiId",
                        column: x => x.PretnjeRanjivostiId,
                        principalTable: "PretnjeRanjivosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PretnjeRanjivosti_DefaultMere_MeraId",
                table: "PretnjeRanjivosti_DefaultMere",
                column: "MeraId");

            migrationBuilder.CreateIndex(
                name: "IX_PretnjeRanjivosti_DefaultMere_PretnjeRanjivostiId",
                table: "PretnjeRanjivosti_DefaultMere",
                column: "PretnjeRanjivostiId");

            migrationBuilder.CreateIndex(
                name: "IX_PretnjeRanjivosti_DefaultMere_PretnjeRanjivostiId_MeraId",
                table: "PretnjeRanjivosti_DefaultMere",
                columns: new[] { "PretnjeRanjivostiId", "MeraId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PretnjeRanjivosti_DefaultMere");
        }
    }
}
