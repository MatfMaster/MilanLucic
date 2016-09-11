using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Zib.Data.Migrations
{
    public partial class VrsteVrednosti_PretnjeRanjivosti : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VrsteVrednosti_PretnjeRanjivosti",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PretnjaRanjivostId = table.Column<int>(nullable: false),
                    VrstaVrednostiId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VrsteVrednosti_PretnjeRanjivosti", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VrsteVrednosti_PretnjeRanjivosti_PretnjeRanjivosti_PretnjaRanjivostId",
                        column: x => x.PretnjaRanjivostId,
                        principalTable: "PretnjeRanjivosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VrsteVrednosti_PretnjeRanjivosti_VrsteVrednosti_VrstaVrednostiId",
                        column: x => x.VrstaVrednostiId,
                        principalTable: "VrsteVrednosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_PretnjaRanjivostId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "PretnjaRanjivostId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_VrstaVrednostiId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                column: "VrstaVrednostiId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PretnjeRanjivosti_VrstaVrednostiId_PretnjaRanjivostId",
                table: "VrsteVrednosti_PretnjeRanjivosti",
                columns: new[] { "VrstaVrednostiId", "PretnjaRanjivostId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VrsteVrednosti_PretnjeRanjivosti");
        }
    }
}
