using Common.Persistance;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Zib.Data;
using Zib.Models;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public class VrsteVrednostiRepository : Repository<VrstaVrednosti>, IVrsteVrednostiRepository
    {
        public ApplicationDbContext ApplicationContext => Context as ApplicationDbContext;

        public VrsteVrednostiRepository(ApplicationDbContext context): base(context)
        { }

        public override async Task<VrstaVrednosti> Get(int id)
        {
            return await ApplicationContext.VrsteVrednosti
                   .Include(vv => vv.OrganizacionaCelina)
                   .Include(vv => vv.PoslovnaVrednost)
                   .Include(vv => vv.VrsteVrednosti_PretnjeRanjivosti)
                   .FirstOrDefaultAsync(vv => vv.Id == id);
        }

        public async Task<VrsteVrednostiViewModel> GetAllViewModel()
        {
            var vrsteVrednostiHijerarhija = VrsteVrednostiHijerarhija();
            var nadredjeniSelect = GetVrsteVrednostiForSelect();

            return new VrsteVrednostiViewModel
            {
                NadredjeniSelect = nadredjeniSelect,
                VrsteVrednostiHijerarhija = vrsteVrednostiHijerarhija,
                OrganizacioneCeline = await ApplicationContext.OrganizacioneCeline.ToListAsync(),
                PoslovneVrednosti = await ApplicationContext.PoslovneVrednosti.ToListAsync()
            };
        }

        public IList<VrstaVrednostiForSelect> GetVrsteVrednostiForSelect()
        {
            var root = new VrstaVrednostiForSelect { Id = 0, Naziv = "Root", Nivo = 0 };
            var vrsteVrednostiHijerarhija = VrsteVrednostiHijerarhija();
            var tree = GetTreeVrsteVrednostiForSelect(vrsteVrednostiHijerarhija, 1);
            tree.Insert(0, root);
            return tree;
        }

        public async Task<int> Nivo(int nodeId)
        {
            var nivo = 0;

            // Ovde bi mogao da generiseexception !!!
            var node = await Get(nodeId);
            if (node == null) return nivo;

            // Nema nadredjenog - to je root
            if (node.NadredjenaKategorija == null) return nivo;

            // Svedok ima nadredjenih nodova
            var parent = await Get((int)node.NadredjenaKategorija);
            while (parent != null)
            {
                nivo++;
                if (parent.NadredjenaKategorija == null)
                    break;

                parent = await Get((int)parent.NadredjenaKategorija);
            }

            return nivo;
        }

        /**
         * Posle dodavanja / izmene vrste vrednost vracam i novu listu za selekt
         */
        public async Task<VrstaVrednostiPosleAzuriranja> VrstaVrednostiPosleAzuriranja(int id)
        {
            var vrsteVrednostiPosleAzuriranja = new VrstaVrednostiPosleAzuriranja
            {
                VrstaVrednosti = await Get(id),
                VrstaVrednostiForSelect = GetVrsteVrednostiForSelect()
            };

            return vrsteVrednostiPosleAzuriranja;
        }

        /*
        * Private Methods
        */
        public IList<VrstaVrednostiTree> VrsteVrednostiHijerarhija()
        {
            var vrsteVrednosti = ApplicationContext.VrsteVrednosti
                .Include(vv => vv.PoslovnaVrednost).Include(vv => vv.OrganizacionaCelina).Include(vv => vv.VrsteVrednosti_PretnjeRanjivosti)
                .OrderBy(vv => vv.NadredjenaKategorija).ThenBy(vv => vv.Naziv);

            return GetTree(vrsteVrednosti.ToList(), 0);
        }

        /// <summary>
        /// Kreiram hijerarhiju VrstaVrednosti sa nesetd child podvrstama
        /// </summary>
        /// <param name="list"></param>
        /// <param name="parent"></param>
        /// <param name="nivo"></param>
        /// <returns></returns>
        private List<VrstaVrednostiTree> GetTree(IList<VrstaVrednosti> list, int parent, int nivo = 0)
        {

            return list.Where(x => x.NadredjenaKategorija == parent).Select(x => new VrstaVrednostiTree
            {
                Id = x.Id,
                Naziv = x.Naziv,
                Opis = x.Opis,
                Nivo = nivo,
                Expanded = false,
                NadredjenaKategorija = x.NadredjenaKategorija,
                PoslovnaVrednostId = x.PoslovnaVrednostId,
                OrganizacionaCelinaId = x.OrganizacionaCelinaId,                
                Children = x.NadredjenaKategorija != x.Id ? GetTree(list, x.Id, nivo + 1) : new List<VrstaVrednostiTree>(),
                OrganizacionaCelina = x.OrganizacionaCelina,
                PoslovnaVrednost = x.PoslovnaVrednost,
                VrsteVrednosti_PretnjeRanjivosti = x.VrsteVrednosti_PretnjeRanjivosti
            }).ToList();
        }
        


        /// <summary>
        /// Kreiram flat listu VrstaVrednosti sa izracunatom hijerarhijom abog tree prikaza u ui-select
        /// </summary>
        /// <param name="vrsteVrednostiHijerarhija"></param>
        /// <param name="nivo"></param>
        /// <returns></returns>
        private IList<VrstaVrednostiForSelect> GetTreeVrsteVrednostiForSelect(IList<VrstaVrednostiTree> vrsteVrednostiHijerarhija, int nivo = 0)
        {
            IList<VrstaVrednostiForSelect> vrsteVrednostiForSelect = new List<VrstaVrednostiForSelect>();
            foreach (var vrstaVrednosti in vrsteVrednostiHijerarhija)
            {
                vrsteVrednostiForSelect.Add(new VrstaVrednostiForSelect { Id = vrstaVrednosti.Id, Naziv = vrstaVrednosti.Naziv, Nivo = nivo });
                if (vrstaVrednosti.Children.Count > 0)
                {
                    var childrens = GetTreeVrsteVrednostiForSelect(vrstaVrednosti.Children, nivo + 1);
                    foreach (var child in childrens)
                    {
                        vrsteVrednostiForSelect.Add(child);
                    }
                }
            }
            return vrsteVrednostiForSelect;
        }

    }
}
