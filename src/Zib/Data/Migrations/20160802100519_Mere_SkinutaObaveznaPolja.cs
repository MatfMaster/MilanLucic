using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Zib.Data.Migrations
{
    public partial class Mere_SkinutaObaveznaPolja : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mere_StatusMere_StatusMereId",
                table: "Mere");

            migrationBuilder.AlterColumn<int>(
                name: "ZaduzenZaImplementaciju",
                table: "Mere",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StatusMereId",
                table: "Mere",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RokZaImplementaciju",
                table: "Mere",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Mere_StatusMere_StatusMereId",
                table: "Mere",
                column: "StatusMereId",
                principalTable: "StatusMere",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mere_StatusMere_StatusMereId",
                table: "Mere");

            migrationBuilder.AlterColumn<int>(
                name: "ZaduzenZaImplementaciju",
                table: "Mere",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "StatusMereId",
                table: "Mere",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RokZaImplementaciju",
                table: "Mere",
                nullable: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Mere_StatusMere_StatusMereId",
                table: "Mere",
                column: "StatusMereId",
                principalTable: "StatusMere",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
