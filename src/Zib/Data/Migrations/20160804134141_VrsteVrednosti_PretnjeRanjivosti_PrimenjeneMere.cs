using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Zib.Data.Migrations
{
    public partial class VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MeraId = table.Column<int>(nullable: false),
                    VrstaVrednosti_PretnjaRanjivostId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere_Mere_MeraId",
                        column: x => x.MeraId,
                        principalTable: "Mere",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere_VrsteVrednosti_PretnjeRanjivosti_VrstaVrednosti_PretnjaRanjivostId",
                        column: x => x.VrstaVrednosti_PretnjaRanjivostId,
                        principalTable: "VrsteVrednosti_PretnjeRanjivosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere_MeraId",
                table: "VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere",
                column: "MeraId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere_VrstaVrednosti_PretnjaRanjivostId",
                table: "VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere",
                column: "VrstaVrednosti_PretnjaRanjivostId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere_VrstaVrednosti_PretnjaRanjivostId_MeraId",
                table: "VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere",
                columns: new[] { "VrstaVrednosti_PretnjaRanjivostId", "MeraId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere");
        }
    }
}
