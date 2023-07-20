
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Text.Json.Serialization;

namespace SignalRTaskManager.Web
{
    public class Program
    {
        private static string CookieScheme = "SignalRTaskManager";

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            
            // Add services to the container.

            builder.Services.AddAuthentication(CookieScheme)
         .AddCookie(CookieScheme, options =>
         {
             options.Events = new CookieAuthenticationEvents
             {
                 OnRedirectToLogin = context =>
                 {
                     context.Response.StatusCode = 403;
                     context.Response.ContentType = "application/json";
                     var result = System.Text.Json.JsonSerializer.Serialize(new { error = "You are not authenticated" });
                     return context.Response.WriteAsync(result);
                 }
             };
         });

            builder.Services.AddSession();
            builder.Services.AddControllersWithViews()
                            .AddJsonOptions(opts =>
                            {
                                var enumConverter = new JsonStringEnumConverter();
                                opts.JsonSerializerOptions.Converters.Add(enumConverter);
                            });
            builder.Services.AddSignalR();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseSession();
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapHub<TaskManagerHub>("/api/taskManagerHub");


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}