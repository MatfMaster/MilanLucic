using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Zib.Data.Migrations
{
    public partial class NovaBaza : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dobavljaci",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Adresa = table.Column<string>(maxLength: 200, nullable: true),
                    Email = table.Column<string>(maxLength: 255, nullable: true),
                    KontaktOsoba = table.Column<string>(maxLength: 200, nullable: true),
                    Mesto = table.Column<string>(maxLength: 100, nullable: true),
                    Naziv = table.Column<string>(maxLength: 200, nullable: false),
                    Telefon = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dobavljaci", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrganizacioneCeline",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Naziv = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizacioneCeline", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PoslovneVrednosti",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Vrednost = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoslovneVrednosti", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProcesiServisiBia",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CiljaniNivoOporavka = table.Column<string>(nullable: true),
                    FinansijskiGubitak = table.Column<bool>(nullable: false),
                    FinansijskiGubitakIznos = table.Column<decimal>(nullable: false),
                    Kritican = table.Column<bool>(nullable: false),
                    MogucnostRucnogObavljanja = table.Column<bool>(nullable: false),
                    Naziv = table.Column<string>(nullable: true),
                    NeiskoriscenaPrilika = table.Column<bool>(nullable: false),
                    NeiskoriscenaPrilikaIznos = table.Column<decimal>(nullable: false),
                    ReputacioniGubitak = table.Column<bool>(nullable: false),
                    ReputacioniGubitakIznos = table.Column<decimal>(nullable: false),
                    Rpo = table.Column<int>(nullable: false),
                    Rto = table.Column<int>(nullable: false),
                    UgovornaObaveza = table.Column<bool>(nullable: false),
                    UgovornaObavezaIznos = table.Column<decimal>(nullable: false),
                    ZakonskaObaveza = table.Column<bool>(nullable: false),
                    ZakonskaObavezaIznos = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesiServisiBia", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ranjivosti",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Opis = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ranjivosti", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VrstePretnji",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Opis = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VrstePretnji", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VlasniciVrednosti",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Ime = table.Column<string>(nullable: true),
                    OrganizacionaCelinaId = table.Column<int>(nullable: false),
                    Prezime = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VlasniciVrednosti", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VlasniciVrednosti_OrganizacioneCeline_OrganizacionaCelinaId",
                        column: x => x.OrganizacionaCelinaId,
                        principalTable: "OrganizacioneCeline",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Zaposleni",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Adresa = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Ime = table.Column<string>(nullable: true),
                    Mesto = table.Column<string>(nullable: true),
                    OrganizacionaCelinaId = table.Column<int>(nullable: false),
                    Prezime = table.Column<string>(nullable: true),
                    Telefon = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zaposleni", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zaposleni_OrganizacioneCeline_OrganizacionaCelinaId",
                        column: x => x.OrganizacionaCelinaId,
                        principalTable: "OrganizacioneCeline",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VrsteVrednosti",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NadredjenaKategorija = table.Column<int>(nullable: true),
                    Naziv = table.Column<string>(nullable: false),
                    Opis = table.Column<string>(nullable: true),
                    OrganizacionaCelinaId = table.Column<int>(nullable: true),
                    PoslovnaVrednostId = table.Column<int>(nullable: true),
                    VrstaVrednostiId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VrsteVrednosti", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VrsteVrednosti_OrganizacioneCeline_OrganizacionaCelinaId",
                        column: x => x.OrganizacionaCelinaId,
                        principalTable: "OrganizacioneCeline",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VrsteVrednosti_PoslovneVrednosti_PoslovnaVrednostId",
                        column: x => x.PoslovnaVrednostId,
                        principalTable: "PoslovneVrednosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VrsteVrednosti_VrsteVrednosti_VrstaVrednostiId",
                        column: x => x.VrstaVrednostiId,
                        principalTable: "VrsteVrednosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProcesServisBia_Dobavljac",
                columns: table => new
                {
                    ProcesServisBiaId = table.Column<int>(nullable: false),
                    DobavljacId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesServisBia_Dobavljac", x => new { x.ProcesServisBiaId, x.DobavljacId });
                    table.ForeignKey(
                        name: "FK_ProcesServisBia_Dobavljac_Dobavljaci_DobavljacId",
                        column: x => x.DobavljacId,
                        principalTable: "Dobavljaci",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesServisBia_Dobavljac_ProcesiServisiBia_ProcesServisBiaId",
                        column: x => x.ProcesServisBiaId,
                        principalTable: "ProcesiServisiBia",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pretnje",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Integritet = table.Column<bool>(nullable: true),
                    Naziv = table.Column<string>(maxLength: 200, nullable: false),
                    Poverljivost = table.Column<bool>(nullable: true),
                    Raspolozivost = table.Column<bool>(nullable: true),
                    VrstaPretnjeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pretnje", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pretnje_VrstePretnji_VrstaPretnjeId",
                        column: x => x.VrstaPretnjeId,
                        principalTable: "VrstePretnji",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vrednosti",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Naziv = table.Column<string>(nullable: true),
                    Opis = table.Column<string>(nullable: true),
                    OrganizacionaCelinaId = table.Column<int>(nullable: true),
                    PoslovnaVrednostId = table.Column<int>(nullable: true),
                    VlasnikVrednostiId = table.Column<int>(nullable: true),
                    VrstaVrednostiId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vrednosti", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vrednosti_OrganizacioneCeline_OrganizacionaCelinaId",
                        column: x => x.OrganizacionaCelinaId,
                        principalTable: "OrganizacioneCeline",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vrednosti_PoslovneVrednosti_PoslovnaVrednostId",
                        column: x => x.PoslovnaVrednostId,
                        principalTable: "PoslovneVrednosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vrednosti_VlasniciVrednosti_VlasnikVrednostiId",
                        column: x => x.VlasnikVrednostiId,
                        principalTable: "VlasniciVrednosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProcesServisBia_Zaposleni",
                columns: table => new
                {
                    ProcesServisBiaId = table.Column<int>(nullable: false),
                    ZaposleniId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesServisBia_Zaposleni", x => new { x.ProcesServisBiaId, x.ZaposleniId });
                    table.ForeignKey(
                        name: "FK_ProcesServisBia_Zaposleni_ProcesiServisiBia_ProcesServisBiaId",
                        column: x => x.ProcesServisBiaId,
                        principalTable: "ProcesiServisiBia",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesServisBia_Zaposleni_Zaposleni_ZaposleniId",
                        column: x => x.ZaposleniId,
                        principalTable: "Zaposleni",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PretnjeRanjivosti",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PretnjaId = table.Column<int>(nullable: false),
                    RanjivostId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PretnjeRanjivosti", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PretnjeRanjivosti_Pretnje_PretnjaId",
                        column: x => x.PretnjaId,
                        principalTable: "Pretnje",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PretnjeRanjivosti_Ranjivosti_RanjivostId",
                        column: x => x.RanjivostId,
                        principalTable: "Ranjivosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProcesServisBia_Vrednost",
                columns: table => new
                {
                    ProcesServisBiaId = table.Column<int>(nullable: false),
                    VrednostId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesServisBia_Vrednost", x => new { x.ProcesServisBiaId, x.VrednostId });
                    table.ForeignKey(
                        name: "FK_ProcesServisBia_Vrednost_ProcesiServisiBia_ProcesServisBiaId",
                        column: x => x.ProcesServisBiaId,
                        principalTable: "ProcesiServisiBia",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesServisBia_Vrednost_Vrednosti_VrednostId",
                        column: x => x.VrednostId,
                        principalTable: "Vrednosti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pretnje_VrstaPretnjeId",
                table: "Pretnje",
                column: "VrstaPretnjeId");

            migrationBuilder.CreateIndex(
                name: "IX_PretnjeRanjivosti_PretnjaId",
                table: "PretnjeRanjivosti",
                column: "PretnjaId");

            migrationBuilder.CreateIndex(
                name: "IX_PretnjeRanjivosti_RanjivostId",
                table: "PretnjeRanjivosti",
                column: "RanjivostId");

            migrationBuilder.CreateIndex(
                name: "IX_PretnjeRanjivosti_PretnjaId_RanjivostId",
                table: "PretnjeRanjivosti",
                columns: new[] { "PretnjaId", "RanjivostId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProcesServisBia_Dobavljac_DobavljacId",
                table: "ProcesServisBia_Dobavljac",
                column: "DobavljacId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcesServisBia_Dobavljac_ProcesServisBiaId",
                table: "ProcesServisBia_Dobavljac",
                column: "ProcesServisBiaId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcesServisBia_Vrednost_ProcesServisBiaId",
                table: "ProcesServisBia_Vrednost",
                column: "ProcesServisBiaId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcesServisBia_Vrednost_VrednostId",
                table: "ProcesServisBia_Vrednost",
                column: "VrednostId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcesServisBia_Zaposleni_ProcesServisBiaId",
                table: "ProcesServisBia_Zaposleni",
                column: "ProcesServisBiaId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcesServisBia_Zaposleni_ZaposleniId",
                table: "ProcesServisBia_Zaposleni",
                column: "ZaposleniId");

            migrationBuilder.CreateIndex(
                name: "IX_VlasniciVrednosti_OrganizacionaCelinaId",
                table: "VlasniciVrednosti",
                column: "OrganizacionaCelinaId");

            migrationBuilder.CreateIndex(
                name: "IX_Vrednosti_OrganizacionaCelinaId",
                table: "Vrednosti",
                column: "OrganizacionaCelinaId");

            migrationBuilder.CreateIndex(
                name: "IX_Vrednosti_PoslovnaVrednostId",
                table: "Vrednosti",
                column: "PoslovnaVrednostId");

            migrationBuilder.CreateIndex(
                name: "IX_Vrednosti_VlasnikVrednostiId",
                table: "Vrednosti",
                column: "VlasnikVrednostiId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_OrganizacionaCelinaId",
                table: "VrsteVrednosti",
                column: "OrganizacionaCelinaId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_PoslovnaVrednostId",
                table: "VrsteVrednosti",
                column: "PoslovnaVrednostId");

            migrationBuilder.CreateIndex(
                name: "IX_VrsteVrednosti_VrstaVrednostiId",
                table: "VrsteVrednosti",
                column: "VrstaVrednostiId");

            migrationBuilder.CreateIndex(
                name: "IX_Zaposleni_OrganizacionaCelinaId",
                table: "Zaposleni",
                column: "OrganizacionaCelinaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PretnjeRanjivosti");

            migrationBuilder.DropTable(
                name: "ProcesServisBia_Dobavljac");

            migrationBuilder.DropTable(
                name: "ProcesServisBia_Vrednost");

            migrationBuilder.DropTable(
                name: "ProcesServisBia_Zaposleni");

            migrationBuilder.DropTable(
                name: "VrsteVrednosti");

            migrationBuilder.DropTable(
                name: "Pretnje");

            migrationBuilder.DropTable(
                name: "Ranjivosti");

            migrationBuilder.DropTable(
                name: "Dobavljaci");

            migrationBuilder.DropTable(
                name: "Vrednosti");

            migrationBuilder.DropTable(
                name: "ProcesiServisiBia");

            migrationBuilder.DropTable(
                name: "Zaposleni");

            migrationBuilder.DropTable(
                name: "VrstePretnji");

            migrationBuilder.DropTable(
                name: "PoslovneVrednosti");

            migrationBuilder.DropTable(
                name: "VlasniciVrednosti");

            migrationBuilder.DropTable(
                name: "OrganizacioneCeline");
        }
    }
}
