using AutoMapper;
using Zib.Models;
using Zib.ViewModels;

namespace Zib
{
    public class AutoMapperMappingProfile : Profile
    {
        public AutoMapperMappingProfile()
        {
            CreateMap<PretnjaEdit, Pretnja>();
            CreateMap<VrstaVrednosti, VrstaVrednostiTree>();
            CreateMap<Pretnja, PretnjaViewModel>().ReverseMap();
        }
    }
}
