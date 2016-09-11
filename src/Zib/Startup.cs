using AutoMapper;
using Common.Filters;
using Common.FormsConfiguration;
using Common.InputFieldsConfiguration;
using Common.TagHelpers;
using FluentValidation.Attributes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Zib.Data;
using Zib.Models;
using Zib.Services;
using FluentValidation.AspNetCore;
using Zib.ViewModels;

namespace Zib
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc().
                AddJsonOptions(options =>
                {
                    options.SerializerSettings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat;
                    options.SerializerSettings.DefaultValueHandling = Newtonsoft.Json.DefaultValueHandling.Include;
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                }).
                AddFluentValidation(cfg => {
                    cfg.ValidatorFactoryType = typeof(AttributedValidatorFactory);
                }).
                AddMvcOptions(options =>
                {
                    options.Filters.Add(new GlobalExceptionFilter());
                });


            // FluentValidation


            // Automapper
            //ConfigureAutoMapper(services);
            //AutoMapperConfiguration.Configure();
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<AutoMapperMappingProfile>();
            });
            services.AddSingleton(Mapper.Configuration);
            services.AddScoped<IMapper>(sp => new Mapper(sp.GetRequiredService<AutoMapper.IConfigurationProvider>(), sp.GetService));


            // ZIB servisi
            ZibServicesConfig(services);




            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
        }

        private void ConfigureAutoMapper(IServiceCollection services)
        {
            var mapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<PretnjaEdit, Pretnja>();
                cfg.CreateMap<VrstaVrednosti, VrstaVrednostiTree>();
                cfg.CreateMap<Pretnja, PretnjaViewModel>().ReverseMap();
            });
            services.AddSingleton(sp => mapperConfiguration.CreateMapper());

        }

        private void ZibServicesConfig(IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSingleton<IFormsConfiguration, FormsConfiguration>();
            services.AddSingleton<IInputFieldsConfiguration, InputFieldsConfiguration>();
            services.AddSingleton<IInputFieldHtmlGenerator, InputFieldHtmlGenerator>();
            services.AddSingleton<IInputFieldValidationGenerator, InputFieldValidationGenerator>();
            services.AddSingleton<IControlLabelHtmlGenerator, ControlLabelHtmlGenerator>();
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                //app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();

            // Add external authentication middleware below. To configure them please see http://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

        }
    }
}
