using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Zib.Data;

namespace Zib.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20160806165645_IntenzitetPretnji")]
    partial class IntenzitetPretnji
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Zib.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Zib.Models.Dobavljac", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Adresa")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 255);

                    b.Property<string>("KontaktOsoba")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("Mesto")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("Telefon")
                        .HasAnnotation("MaxLength", 200);

                    b.HasKey("Id");

                    b.ToTable("Dobavljaci");
                });

            modelBuilder.Entity("Zib.Models.IntenzitetPretnje", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Naziv");

                    b.Property<int>("Vrednost");

                    b.HasKey("Id");

                    b.ToTable("IntenzitetPretnje");
                });

            modelBuilder.Entity("Zib.Models.Mera", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Aktivna");

                    b.Property<bool>("Grupna");

                    b.Property<string>("Naziv")
                        .HasAnnotation("MaxLength", 255);

                    b.Property<string>("Oznaka")
                        .HasAnnotation("MaxLength", 64);

                    b.Property<DateTime?>("RokZaImplementaciju");

                    b.Property<int?>("StatusMereId");

                    b.Property<int?>("ZaduzenZaImplementaciju");

                    b.Property<int?>("ZaposleniZaduzenZaImplementacijuId");

                    b.HasKey("Id");

                    b.HasIndex("StatusMereId");

                    b.HasIndex("ZaposleniZaduzenZaImplementacijuId");

                    b.ToTable("Mere");
                });

            modelBuilder.Entity("Zib.Models.OrganizacionaCelina", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Naziv")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("OrganizacioneCeline");
                });

            modelBuilder.Entity("Zib.Models.PoslovnaVrednost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Vrednost");

                    b.HasKey("Id");

                    b.ToTable("PoslovneVrednosti");
                });

            modelBuilder.Entity("Zib.Models.Pretnja", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool?>("Integritet");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.Property<bool?>("Poverljivost");

                    b.Property<bool?>("Raspolozivost");

                    b.Property<int>("VrstaPretnjeId");

                    b.HasKey("Id");

                    b.HasIndex("VrstaPretnjeId");

                    b.ToTable("Pretnje");
                });

            modelBuilder.Entity("Zib.Models.PretnjeRanjivosti", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PretnjaId");

                    b.Property<int>("RanjivostId");

                    b.HasKey("Id");

                    b.HasIndex("PretnjaId");

                    b.HasIndex("RanjivostId");

                    b.HasIndex("PretnjaId", "RanjivostId")
                        .IsUnique();

                    b.ToTable("PretnjeRanjivosti");
                });

            modelBuilder.Entity("Zib.Models.ProcesServisBia", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CiljaniNivoOporavka");

                    b.Property<bool>("FinansijskiGubitak");

                    b.Property<decimal>("FinansijskiGubitakIznos");

                    b.Property<bool>("Kritican");

                    b.Property<bool>("MogucnostRucnogObavljanja");

                    b.Property<string>("Naziv");

                    b.Property<bool>("NeiskoriscenaPrilika");

                    b.Property<decimal>("NeiskoriscenaPrilikaIznos");

                    b.Property<bool>("ReputacioniGubitak");

                    b.Property<decimal>("ReputacioniGubitakIznos");

                    b.Property<int>("Rpo");

                    b.Property<int>("Rto");

                    b.Property<bool>("UgovornaObaveza");

                    b.Property<decimal>("UgovornaObavezaIznos");

                    b.Property<bool>("ZakonskaObaveza");

                    b.Property<decimal>("ZakonskaObavezaIznos");

                    b.HasKey("Id");

                    b.ToTable("ProcesiServisiBia");
                });

            modelBuilder.Entity("Zib.Models.ProcesServisBia_Dobavljac", b =>
                {
                    b.Property<int>("ProcesServisBiaId");

                    b.Property<int>("DobavljacId");

                    b.HasKey("ProcesServisBiaId", "DobavljacId");

                    b.HasIndex("DobavljacId");

                    b.HasIndex("ProcesServisBiaId");

                    b.ToTable("ProcesServisBia_Dobavljac");
                });

            modelBuilder.Entity("Zib.Models.ProcesServisBia_Vrednost", b =>
                {
                    b.Property<int>("ProcesServisBiaId");

                    b.Property<int>("VrednostId");

                    b.HasKey("ProcesServisBiaId", "VrednostId");

                    b.HasIndex("ProcesServisBiaId");

                    b.HasIndex("VrednostId");

                    b.ToTable("ProcesServisBia_Vrednost");
                });

            modelBuilder.Entity("Zib.Models.ProcesServisBia_Zaposleni", b =>
                {
                    b.Property<int>("ProcesServisBiaId");

                    b.Property<int>("ZaposleniId");

                    b.HasKey("ProcesServisBiaId", "ZaposleniId");

                    b.HasIndex("ProcesServisBiaId");

                    b.HasIndex("ZaposleniId");

                    b.ToTable("ProcesServisBia_Zaposleni");
                });

            modelBuilder.Entity("Zib.Models.Ranjivost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Opis");

                    b.HasKey("Id");

                    b.ToTable("Ranjivosti");
                });

            modelBuilder.Entity("Zib.Models.StatusMere", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Status")
                        .HasAnnotation("MaxLength", 64);

                    b.HasKey("Id");

                    b.ToTable("StatusMere");
                });

            modelBuilder.Entity("Zib.Models.VlasnikVrednosti", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Ime");

                    b.Property<int>("OrganizacionaCelinaId");

                    b.Property<string>("Prezime");

                    b.HasKey("Id");

                    b.HasIndex("OrganizacionaCelinaId");

                    b.ToTable("VlasniciVrednosti");
                });

            modelBuilder.Entity("Zib.Models.Vrednost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Naziv");

                    b.Property<string>("Opis");

                    b.Property<int?>("OrganizacionaCelinaId");

                    b.Property<int?>("PoslovnaVrednostId");

                    b.Property<int?>("VlasnikVrednostiId");

                    b.Property<int>("VrstaVrednostiId");

                    b.HasKey("Id");

                    b.HasIndex("OrganizacionaCelinaId");

                    b.HasIndex("PoslovnaVrednostId");

                    b.HasIndex("VlasnikVrednostiId");

                    b.ToTable("Vrednosti");
                });

            modelBuilder.Entity("Zib.Models.VrstaPretnje", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.HasKey("Id");

                    b.ToTable("VrstePretnji");
                });

            modelBuilder.Entity("Zib.Models.VrstaVrednosti", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("NadredjenaKategorija");

                    b.Property<string>("Naziv")
                        .IsRequired();

                    b.Property<string>("Opis");

                    b.Property<int?>("OrganizacionaCelinaId");

                    b.Property<int?>("PoslovnaVrednostId");

                    b.Property<int?>("VrstaVrednostiId");

                    b.HasKey("Id");

                    b.HasIndex("OrganizacionaCelinaId");

                    b.HasIndex("PoslovnaVrednostId");

                    b.HasIndex("VrstaVrednostiId");

                    b.ToTable("VrsteVrednosti");
                });

            modelBuilder.Entity("Zib.Models.VrsteVrednosti_PretnjeRanjivosti", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PretnjaRanjivostId");

                    b.Property<int>("VrstaVrednostiId");

                    b.HasKey("Id");

                    b.HasIndex("PretnjaRanjivostId");

                    b.HasIndex("VrstaVrednostiId");

                    b.HasIndex("VrstaVrednostiId", "PretnjaRanjivostId")
                        .IsUnique();

                    b.ToTable("VrsteVrednosti_PretnjeRanjivosti");
                });

            modelBuilder.Entity("Zib.Models.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("MeraId");

                    b.Property<int>("VrstaVrednosti_PretnjaRanjivostId");

                    b.HasKey("Id");

                    b.HasIndex("MeraId");

                    b.HasIndex("VrstaVrednosti_PretnjaRanjivostId");

                    b.HasIndex("VrstaVrednosti_PretnjaRanjivostId", "MeraId")
                        .IsUnique();

                    b.ToTable("VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere");
                });

            modelBuilder.Entity("Zib.Models.Zaposleni", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Adresa");

                    b.Property<string>("Email");

                    b.Property<string>("Ime");

                    b.Property<string>("Mesto");

                    b.Property<int>("OrganizacionaCelinaId");

                    b.Property<string>("Prezime");

                    b.Property<string>("Telefon");

                    b.HasKey("Id");

                    b.HasIndex("OrganizacionaCelinaId");

                    b.ToTable("Zaposleni");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Zib.Models.ApplicationUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Zib.Models.ApplicationUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Zib.Models.ApplicationUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Zib.Models.Mera", b =>
                {
                    b.HasOne("Zib.Models.StatusMere", "StatusMere")
                        .WithMany()
                        .HasForeignKey("StatusMereId");

                    b.HasOne("Zib.Models.Zaposleni", "ZaposleniZaduzenZaImplementaciju")
                        .WithMany()
                        .HasForeignKey("ZaposleniZaduzenZaImplementacijuId");
                });

            modelBuilder.Entity("Zib.Models.Pretnja", b =>
                {
                    b.HasOne("Zib.Models.VrstaPretnje", "VrstaPretnje")
                        .WithMany()
                        .HasForeignKey("VrstaPretnjeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Zib.Models.PretnjeRanjivosti", b =>
                {
                    b.HasOne("Zib.Models.Pretnja", "Pretnja")
                        .WithMany("PretnjeRanjivosti")
                        .HasForeignKey("PretnjaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Zib.Models.Ranjivost", "Ranjivost")
                        .WithMany("Pretnje")
                        .HasForeignKey("RanjivostId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Zib.Models.ProcesServisBia_Dobavljac", b =>
                {
                    b.HasOne("Zib.Models.Dobavljac", "Dobavljac")
                        .WithMany("ProcesServisBia_Dobavljac")
                        .HasForeignKey("DobavljacId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Zib.Models.ProcesServisBia", "ProcesServisBia")
                        .WithMany("Dobavljaci")
                        .HasForeignKey("ProcesServisBiaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Zib.Models.ProcesServisBia_Vrednost", b =>
                {
                    b.HasOne("Zib.Models.ProcesServisBia", "ProcesServisBia")
                        .WithMany("Resursi")
                        .HasForeignKey("ProcesServisBiaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Zib.Models.Vrednost", "Vrednost")
                        .WithMany("ProcesServisBia_Vrednosti")
                        .HasForeignKey("VrednostId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Zib.Models.ProcesServisBia_Zaposleni", b =>
                {
                    b.HasOne("Zib.Models.ProcesServisBia", "ProcesServisBia")
                        .WithMany("Zaposleni")
                        .HasForeignKey("ProcesServisBiaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Zib.Models.Zaposleni", "Zaposleni")
                        .WithMany("ProcesServisBia_Zaposleni")
                        .HasForeignKey("ZaposleniId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Zib.Models.VlasnikVrednosti", b =>
                {
                    b.HasOne("Zib.Models.OrganizacionaCelina", "OrganizacionaCelina")
                        .WithMany()
                        .HasForeignKey("OrganizacionaCelinaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Zib.Models.Vrednost", b =>
                {
                    b.HasOne("Zib.Models.OrganizacionaCelina", "OrganizacionaCelina")
                        .WithMany()
                        .HasForeignKey("OrganizacionaCelinaId");

                    b.HasOne("Zib.Models.PoslovnaVrednost", "PoslovnaVrednost")
                        .WithMany()
                        .HasForeignKey("PoslovnaVrednostId");

                    b.HasOne("Zib.Models.VlasnikVrednosti", "VlasnikVrednosti")
                        .WithMany()
                        .HasForeignKey("VlasnikVrednostiId");
                });

            modelBuilder.Entity("Zib.Models.VrstaVrednosti", b =>
                {
                    b.HasOne("Zib.Models.OrganizacionaCelina", "OrganizacionaCelina")
                        .WithMany()
                        .HasForeignKey("OrganizacionaCelinaId");

                    b.HasOne("Zib.Models.PoslovnaVrednost", "PoslovnaVrednost")
                        .WithMany()
                        .HasForeignKey("PoslovnaVrednostId");

                    b.HasOne("Zib.Models.VrstaVrednosti")
                        .WithMany("Children")
                        .HasForeignKey("VrstaVrednostiId");
                });

            modelBuilder.Entity("Zib.Models.VrsteVrednosti_PretnjeRanjivosti", b =>
                {
                    b.HasOne("Zib.Models.PretnjeRanjivosti", "PretnjeRanjivosti")
                        .WithMany("VrsteVrednosti_PretnjeRanjivosti")
                        .HasForeignKey("PretnjaRanjivostId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Zib.Models.VrstaVrednosti", "VrstaVrednosti")
                        .WithMany("VrsteVrednosti_PretnjeRanjivosti")
                        .HasForeignKey("VrstaVrednostiId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Zib.Models.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere", b =>
                {
                    b.HasOne("Zib.Models.Mera", "Mera")
                        .WithMany("VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere")
                        .HasForeignKey("MeraId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Zib.Models.VrsteVrednosti_PretnjeRanjivosti", "VrsteVrednosti_PretnjeRanjivosti")
                        .WithMany("VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere")
                        .HasForeignKey("VrstaVrednosti_PretnjaRanjivostId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Zib.Models.Zaposleni", b =>
                {
                    b.HasOne("Zib.Models.OrganizacionaCelina", "OrganizacionaCelina")
                        .WithMany()
                        .HasForeignKey("OrganizacionaCelinaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
