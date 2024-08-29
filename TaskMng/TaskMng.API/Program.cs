
using TaskMng.Core.Repositories;
using TaskMng.Data;
using TaskMng.Data.Repositories;

namespace TaskMng.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var policy = "policy";
            builder.Services.AddCors(option => option.AddPolicy(name: policy, policy =>
            {
                policy.AllowAnyOrigin(); policy.AllowAnyHeader(); policy.AllowAnyMethod();
            }));
            builder.Services.AddScoped<ITaskRepository, TaskRepository>();

            builder.Services.AddDbContext<DataContext>();


            var app = builder.Build();
            app.UseCors(builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors(policy);
            app.MapControllers();
            app.Run();
        }
    }
}




