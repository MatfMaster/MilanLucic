using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Zib.Data.Migrations
{
    public partial class VrsteVrednostiPretnjeRanjivostiProcenaRizika : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PretnjaPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PretnjaPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RanjivostPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RanjivostPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_PretnjaPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "PretnjaPosleId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_PretnjaPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "PretnjaPreId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_RanjivostPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "RanjivostPosleId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_RanjivostPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "RanjivostPreId");

            migrationBuilder.AddForeignKey(
                name: "FK_VrsteVrednosti_PretnjeRanjivosti_IntenzitetPretnje_PretnjaPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "PretnjaPosleId",
                principalTable: "IntenzitetPretnje",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VrsteVrednosti_PretnjeRanjivosti_IntenzitetPretnje_PretnjaPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "PretnjaPreId",
                principalTable: "IntenzitetPretnje",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VrsteVrednosti_PretnjeRanjivosti_IntenzitetRanjivosti_RanjivostPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "RanjivostPosleId",
                principalTable: "IntenzitetRanjivosti",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VrsteVrednosti_PretnjeRanjivosti_IntenzitetRanjivosti_RanjivostPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "RanjivostPreId",
                principalTable: "IntenzitetRanjivosti",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VrsteVrednosti_PretnjeRanjivosti_IntenzitetPretnje_PretnjaPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropForeignKey(
                name: "FK_VrsteVrednosti_PretnjeRanjivosti_IntenzitetPretnje_PretnjaPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropForeignKey(
                name: "FK_VrsteVrednosti_PretnjeRanjivosti_IntenzitetRanjivosti_RanjivostPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropForeignKey(
                name: "FK_VrsteVrednosti_PretnjeRanjivosti_IntenzitetRanjivosti_RanjivostPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_PretnjaPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_PretnjaPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_RanjivostPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_RanjivostPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropColumn(
                name: "PretnjaPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropColumn(
                name: "PretnjaPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropColumn(
                name: "RanjivostPosleId",
                table: "VrsteVrednosti_PretnjeRanjivosti");

            migrationBuilder.DropColumn(
                name: "RanjivostPreId",
                table: "VrsteVrednosti_PretnjeRanjivosti");
        }
    }
}
