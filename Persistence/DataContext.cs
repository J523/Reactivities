using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence

{
/*
Whenever you make changes to the context class you have to add migration for it. else it will not be reflected.
*/
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options):base(options)
        {
            
        }        

        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>().HasData(
                new Value { Id= 1 , Name = "DotNet101"},
                new Value { Id= 2 , Name = "DotNet102"},
                new Value { Id= 3 , Name = "DotNet103"},
                new Value { Id= 4 , Name = "DotNet104"}
            );
        }
    }
}
