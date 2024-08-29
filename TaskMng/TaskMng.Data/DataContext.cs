using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskMng.Core.Models;

namespace TaskMng.Data
{
    public class DataContext: DbContext
    {
        //public DataContext(DbContextOptions<DataContext> options):base(options)
        //{

        //}

        public DbSet<TodoTask> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=Tasks;Integrated Security=true; User ID=Riki;Password=1234; TrustServerCertificate=True");
        }


    }
}
