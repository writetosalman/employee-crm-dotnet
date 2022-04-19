
using Microsoft.EntityFrameworkCore;
using EmployeeWebAPI.Entities;

namespace EmployeeWebAPI.Repositories
{

    public class EmployeeDBContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }

        public EmployeeDBContext(DbContextOptions<EmployeeDBContext> options)
            : base(options)
        {

        }
    }
}