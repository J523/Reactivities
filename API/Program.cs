using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
           var host = CreateHostBuilder(args).Build();
/*
 a .NET Core console app will require you to create and manage all scopes yourself whereas a ASP.NET Core app will create 
and manage the HttpRequest scope by default through defined middleware(s)
Similar to adding a scoped services in Configure e.g services.AddScoped<>() where whenever an http request would hit it, 
it will create a scoped instance
*/
            using(var scope = host.Services.CreateScope())
            {  var services = scope.ServiceProvider;
                try{
                    
                    var context = services.GetRequiredService<DataContext>();
                    context.Database.Migrate();
                    Seed.SeedData(context);
                }
                catch(Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex ,"Error occured while migration");
                }

            }

           host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
