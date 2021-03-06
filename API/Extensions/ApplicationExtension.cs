using Application.Core;
using Application.Files;
using Application.Interfaces;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

namespace API.Extensions
{
  public static class ApplicationServiceExtension
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddDbContext<DataContext>(opt => opt.UseSqlite(config.GetConnectionString("DefaultConnection")));
      services.AddCors(opt => opt.AddPolicy("CorsPolicy", policy => policy
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .WithExposedHeaders("WWW-Authenticate", "Pagination")
        .WithOrigins("http://localhost:3000")
      ));
      services.AddMediatR(typeof(Create.Handler).Assembly);
      services.AddAutoMapper(typeof(MappingProfiles).Assembly);
      services.AddScoped<IUserAccessor, UserAccessor>();
      services.AddScoped<IPhotoAccessor, PhotoAccessor>();
      services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
      services.AddSignalR();
      return (services);
    }
  }
}