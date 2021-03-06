using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : IdentityDbContext<User>
  {
    public DbSet<Group> Groups { get; set; }
    public DbSet<File> Files { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Comment> Comments { get; set; }

    public DataContext(DbContextOptions options) : base(options) { }
  }
}