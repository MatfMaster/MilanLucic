using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Zib.Models;

namespace Zib.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Ranjivost> Ranjivosti { get; set; }
        public DbSet<VrstaPretnje> VrstePretnji { get; set; }
        public DbSet<Pretnja> Pretnje { get; set; }
        public DbSet<VrstaVrednosti> VrsteVrednosti { get; set; }
        public DbSet<OrganizacionaCelina> OrganizacioneCeline { get; set; }
        public DbSet<PoslovnaVrednost> PoslovneVrednosti { get; set; }
        public DbSet<Vrednost> Vrednosti { get; set; }
        public DbSet<VlasnikVrednosti> VlasniciVrednosti { get; set; }
        public DbSet<Dobavljac> Dobavljaci { get; set; }
        public DbSet<Zaposleni> Zaposleni { get; set; }
        public DbSet<ProcesServisBia> ProcesiServisiBia { get; set; }
        public DbSet<Mera> Mere{ get; set; }
        public DbSet<StatusMere> StatusMere { get; set; }
        public DbSet<IntenzitetPretnje> IntenzitetPretnje { get; set; }
        public DbSet<IntenzitetRanjivosti> IntenzitetRanjivosti { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            // Vise prema vise ProcesServisBia i Zaposleni
            //            builder.Entity<ProcesServisBia_Zaposleni>().HasKey(psbz => new { psbz.Id });
            //            builder.Entity<ProcesServisBia_Zaposleni>().HasIndex(psbz => new { psbz.ProcesServisBiaId, psbz.ZaposleniId }).IsUnique(true);
            builder.Entity<ProcesServisBia_Zaposleni>().HasKey(psbz => new { psbz.ProcesServisBiaId, psbz.ZaposleniId });
            builder.Entity<ProcesServisBia_Zaposleni>().
                HasOne(psbz => psbz.ProcesServisBia).
                WithMany(psb => psb.Zaposleni).
                HasForeignKey(psbz => psbz.ProcesServisBiaId);

            builder.Entity<ProcesServisBia_Zaposleni>().
                HasOne(psbz => psbz.Zaposleni).
                WithMany(z => z.ProcesServisBia_Zaposleni).
                HasForeignKey(psbz => psbz.ZaposleniId);

            // Vise prema vise ProcesServisBia i resursi (tabela Vrednosti)
            //            builder.Entity<ProcesServisBia_Vrednost>().HasKey(psbv => new { psbv.Id });
            //            builder.Entity<ProcesServisBia_Vrednost>().HasIndex(psbv => new { psbv.ProcesServisBiaId, psbv.VrednostId }).IsUnique(true);
            builder.Entity<ProcesServisBia_Vrednost>().HasKey(psbv => new { psbv.ProcesServisBiaId, psbv.VrednostId });
            builder.Entity<ProcesServisBia_Vrednost>().
                HasOne(psbv => psbv.ProcesServisBia).
                WithMany(psb => psb.Resursi).
                HasForeignKey(psbz => psbz.ProcesServisBiaId);

            builder.Entity<ProcesServisBia_Vrednost>().
                HasOne(psbz => psbz.Vrednost).
                WithMany(v => v.ProcesServisBia_Vrednosti).
                HasForeignKey(psbz => psbz.VrednostId);


            // Vise prema vise ProcesServisBia i Dobavljaca
            //            builder.Entity<ProcesServisBia_Dobavljac>().HasKey(psbd => new { psbd.Id });
            //            builder.Entity<ProcesServisBia_Dobavljac>().HasIndex(psbd => new { psbd.ProcesServisBiaId, psbd.DobavljacId }).IsUnique(true);
            builder.Entity<ProcesServisBia_Dobavljac>().HasKey(psbd => new { psbd.ProcesServisBiaId, psbd.DobavljacId });
            builder.Entity<ProcesServisBia_Dobavljac>().
                HasOne(psbd => psbd.ProcesServisBia).
                WithMany(psb => psb.Dobavljaci).
                HasForeignKey(psbd => psbd.ProcesServisBiaId);

            builder.Entity<ProcesServisBia_Dobavljac>().
                HasOne(psbz => psbz.Dobavljac).
                WithMany(d => d.ProcesServisBia_Dobavljac).
                HasForeignKey(psbd => psbd.DobavljacId);

            // Vise prema vise Pretnje <=> Ranjivosti
            builder.Entity<PretnjeRanjivosti>().HasKey(pr => new { pr.Id });
            builder.Entity<PretnjeRanjivosti>().Property(pr => pr.Id).UseSqlServerIdentityColumn();
            builder.Entity<PretnjeRanjivosti>().HasIndex(pr => new { pr.PretnjaId, pr.RanjivostId }).IsUnique();
            builder.Entity<PretnjeRanjivosti>().HasOne(pr => pr.Pretnja).WithMany(p => p.PretnjeRanjivosti).HasForeignKey(pr => pr.PretnjaId);
            builder.Entity<PretnjeRanjivosti>().HasOne(pr => pr.Ranjivost).WithMany(r => r.Pretnje).HasForeignKey(pr => pr.RanjivostId);

            // VrsteVrednosti <=> PretnjeRajivosti
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti>().HasKey(vvpr => new { vvpr.Id });
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti>().Property(vvpr => vvpr.Id).UseSqlServerIdentityColumn();
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti>().HasIndex(vvpr => new { vvpr.VrstaVrednostiId, vvpr.PretnjaRanjivostId }).IsUnique();
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti>()
                .HasOne(vvpr => vvpr.PretnjeRanjivosti)
                .WithMany(pr => pr.VrsteVrednosti_PretnjeRanjivosti)
                .HasForeignKey(vvpr => vvpr.PretnjaRanjivostId);
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti>()
                .HasOne(vvpr => vvpr.VrstaVrednosti)
                .WithMany(vv => vv.VrsteVrednosti_PretnjeRanjivosti)
                .HasForeignKey(vvpr => vvpr.VrstaVrednostiId);

            builder.Entity<VrsteVrednosti_PretnjeRanjivosti>().
                HasOne(vvpr => vvpr.PretnjaPre).
                WithMany(ip => ip.VrsteVrednosti_PretnjeRanjivosti_Pre).
                HasForeignKey(vvpr => vvpr.PretnjaPreId).
                OnDelete(DeleteBehavior.Restrict);
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti>().
                HasOne(vvpr => vvpr.PretnjaPosle).
                WithMany(ip => ip.VrsteVrednosti_PretnjeRanjivosti_Posle).
                HasForeignKey(vvpr => vvpr.PretnjaPosleId).
                OnDelete(DeleteBehavior.Restrict);

            builder.Entity<VrsteVrednosti_PretnjeRanjivosti>().
                HasOne(vvpr => vvpr.RanjivostPre).
                WithMany(ip => ip.VrsteVrednosti_PretnjeRanjivosti_Pre).
                HasForeignKey(vvpr => vvpr.RanjivostPreId).
                OnDelete(DeleteBehavior.Restrict);

            builder.Entity<VrsteVrednosti_PretnjeRanjivosti>().
                HasOne(vvpr => vvpr.RanjivostPosle).
                WithMany(ip => ip.VrsteVrednosti_PretnjeRanjivosti_Posle).
                HasForeignKey(vvpr => vvpr.RanjivostPosleId).
                OnDelete(DeleteBehavior.Restrict);


            // VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere>().HasKey(x => new { x.Id });
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere>().Property(x => x.Id).UseSqlServerIdentityColumn();
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere>().HasIndex(x => new { x.VrstaVrednosti_PretnjaRanjivostId, x.MeraId }).IsUnique();
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere>()
                .HasOne(vvprpm => vvprpm.VrsteVrednosti_PretnjeRanjivosti)
                .WithMany(vvpr => vvpr.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere)
                .HasForeignKey(vvpr => vvpr.VrstaVrednosti_PretnjaRanjivostId);
            builder.Entity<VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere>()
                .HasOne(vvprpm => vvprpm.Mera)
                .WithMany(m => m.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere)
                .HasForeignKey(vvprpm => vvprpm.MeraId);


            // PretnjeRanjivosti_DefaultMere
            builder.Entity<PretnjeRanjivosti_DefaultMere>().HasKey(x => new { x.Id });
            builder.Entity<PretnjeRanjivosti_DefaultMere>().Property(x => x.Id).UseSqlServerIdentityColumn();
            builder.Entity<PretnjeRanjivosti_DefaultMere>().HasIndex(x => new { x.PretnjeRanjivostiId, x.MeraId }).IsUnique();
            builder.Entity<PretnjeRanjivosti_DefaultMere>().
                HasOne(prdm => prdm.PretnjeRanjivosti).
                WithMany(pr => pr.PretnjeRanjivosti_DefaultMere).
                HasForeignKey(prdm => prdm.PretnjeRanjivostiId);
            builder.Entity<PretnjeRanjivosti_DefaultMere>().
                HasOne(prdm => prdm.Mera).
                WithMany(m => m.PretnjeRanjivosti_DefaultMere).
                HasForeignKey(prdm => prdm.MeraId);

        }
    }
}
