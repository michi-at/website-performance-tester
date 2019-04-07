using Core.Entities;
using System.Data.Entity;

namespace Core.Concrete
{
    public class TestContext : DbContext
    {
        public TestContext() : base("TestContext") { }

        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<TestResultDetail> TestResultDetails { get; set; }
    }
}
