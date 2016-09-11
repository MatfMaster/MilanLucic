using AutoMapper;

namespace Zib
{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(x =>
            {
                x.AddProfile<AutoMapperMappingProfile>();
            });
        }
    }
}
