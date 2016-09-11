using Zib.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Zib.ViewModels;
using System.Linq;
using System;

namespace Zib.Repositories
{
    public class PretnjeRanjivostiRepository : IPretnjeRanjivostiRepository
    {
        protected readonly DbContext Context;
        public IdentityDbContext ApplicationDbContext
        {
            get { return Context as IdentityDbContext; }
        }

        public PretnjeRanjivostiRepository(DbContext context)
        {
            Context = context;
        }

        public async Task<PretnjeRanjivosti> Get(int id)
        {
            return await Context.Set<PretnjeRanjivosti>().
                Include(pr => pr.PretnjeRanjivosti_DefaultMere).
                Where(pr => pr.Id == id).
                FirstOrDefaultAsync();
        }
        public async Task<List<PretnjeRanjivosti_DefaultMere>> GetDefaultMere(int id)
        {
            //var pretnjaRanjivost = await Context.Set<PretnjeRanjivosti>().
            //    Include(pr => pr.PretnjeRanjivosti_DefaultMere).
            //    Where(pr => pr.Id == id).
            //    FirstOrDefaultAsync();
            var pretnjaRanjivost = await Get(id);
            if (pretnjaRanjivost == null || pretnjaRanjivost.PretnjeRanjivosti_DefaultMere == null)
                return new List<PretnjeRanjivosti_DefaultMere>();

            return pretnjaRanjivost.PretnjeRanjivosti_DefaultMere;
        }

        public async Task<IList<PretnjeRanjivostiZaProcenuRizikaViewModel>> GetPretnjeRanjivostiZaProcenuRizika()
        {
            return await Context.Set<PretnjeRanjivosti>()
                            .Include(pr => pr.Pretnja)
                            .Include(pr => pr.Ranjivost)
                            .OrderBy(pr => pr.Pretnja.Naziv)
                            .ThenBy(pr => pr.Ranjivost.Opis).
                            Select(pr => new PretnjeRanjivostiZaProcenuRizikaViewModel
                            {
                                Id = pr.Id,
                                PretnjaId = pr.PretnjaId,
                                RanjivostId = pr.RanjivostId,
                                Pretnja = pr.Pretnja.Naziv,
                                Ranjivost = pr.Ranjivost.Opis
                            }).
                            ToListAsync();
        }

        public async Task<IList<PretnjaRanjivostZaVrstuVrednosti>> PretnjeRanjivostiZaVrstuVrednosti(int vrstaVrednostiId)
        {
            var vrstaVrednosti = await Context.Set<VrstaVrednosti>().
                Where(vv => vv.Id == vrstaVrednostiId).
                Include(vv => vv.PoslovnaVrednost).
                FirstOrDefaultAsync();

            var vrstaVrednostiPoslovnaVrednost = vrstaVrednosti.PoslovnaVrednost != null ? vrstaVrednosti.PoslovnaVrednost.Vrednost : 0;

            return await Context.Set<VrsteVrednosti_PretnjeRanjivosti>().
                Where(x => x.VrstaVrednostiId == vrstaVrednostiId).
                Include(x => x.PretnjaPre).
                Include(x => x.PretnjaPosle).
                Include(x => x.RanjivostPre).
                Include(x => x.RanjivostPosle).
                Select(x => new PretnjaRanjivostZaVrstuVrednosti {
                    Id = x.Id,
                    PretnjaRanjivostId = x.PretnjaRanjivostId,
                    VrstaVrednostiId = x.VrstaVrednostiId,
                    //PretnjaPreVrednost = x.PretnjaPre.Vrednost,
                    //PretnjaPosleVrednost = x.PretnjaPosle.Vrednost,
                    //RanjivostPreVrednost = x.RanjivostPre.Vrednost,
                    //RanjivostPosleVrednost = x.RanjivostPosle.Vrednost,
                    PretnjaPre = new IntenzitetPretnjeViewModel { Id = x.PretnjaPre.Id, Naziv = x.PretnjaPre.Naziv, Vrednost = x.PretnjaPre.Vrednost},
                    PretnjaPosle = new IntenzitetPretnjeViewModel { Id = x.PretnjaPosle.Id, Naziv = x.PretnjaPosle.Naziv, Vrednost = x.PretnjaPosle.Vrednost },
                    RanjivostPre = new IntenzitetRanjivostiViewModel { Id = x.RanjivostPre.Id, Naziv = x.RanjivostPre.Naziv, Vrednost = x.RanjivostPre.Vrednost },
                    RanjivostPosle = new IntenzitetRanjivostiViewModel { Id = x.RanjivostPosle.Id, Naziv = x.RanjivostPosle.Naziv, Vrednost = x.RanjivostPosle.Vrednost },

                    RizikPre = x.PretnjaPre.Vrednost * x.RanjivostPre.Vrednost * vrstaVrednostiPoslovnaVrednost,
                    RizikPosle = x.PretnjaPosle.Vrednost * x.RanjivostPosle.Vrednost * vrstaVrednostiPoslovnaVrednost
                }).
                ToListAsync();
        }

        // public async Task<PretnjeRanjivostiViewModel> GetAll()
        //public async Task<IList<Pretnja>> GetAll()
        //{
        //    return await Context.Set<Pretnja>().
        //        Include(p => p.VrstaPretnje).
        //        Include(p => p.PretnjeRanjivosti).
        //        OrderBy(p => p.VrstaPretnje.Opis).
        //        ThenBy(p => p.Naziv).ToListAsync();
        //}

        public Task PretnjeRanjivostiZaVrstuVrednostiPrimenjeneMere(int pretnjaRanjivostId)
        {
            return null;
            //return await Context.Set<VrsteVrednosti_PretnjeRanjivosti>().
            //    Where(x => x.VrstaVrednostiId == VrstaVrednostiId).
            //    Select(x => new PretnjaRanjivostZaVrstuVrednosti { Id = x.PretnjaRanjivostId }).
            //    ToListAsync();

        }

        public async Task<IList<RanjivostiZaPretnjuViewModel>> RanjivostiZaPretnju(int id)
        {
            var pretnja = await Context.Set<Pretnja>().
                Include(p => p.PretnjeRanjivosti).
                Where(p => p.Id == id).
                FirstOrDefaultAsync();

            var ranjivosti = pretnja.PretnjeRanjivosti.Select(pr => new RanjivostiZaPretnjuViewModel { RanjivostId = pr.RanjivostId, PretnjaRanjivostId = pr.Id }).ToList();
            return ranjivosti;
        }

        public async Task<PretnjeRanjivosti> GetByPretnjaRanjivost(int pretnjaId, int ranjivostId)
        {
            return await Context.Set<PretnjeRanjivosti>().
                 Where(pr => pr.PretnjaId == pretnjaId && pr.RanjivostId == ranjivostId).
                 FirstOrDefaultAsync();
                
        }
    }
}
