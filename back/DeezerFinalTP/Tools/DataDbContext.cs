using DeezerFinalTP.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeezerFinalTP.Tools
{
    public class DataDbContext : DbContext
    {
        public DataDbContext() : base()
        {

        }
        public DbSet<Utilisateur> Utilisateurs { get; set; }
    


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
          
            optionsBuilder.UseSqlServer(@"Data Source=(localDb)\DeezerProjectFinal;Integrated Security=True");
        }
    }
}
