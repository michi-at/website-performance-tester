using Core.Abstract;
using Core.Entities;
using Core.Extensions;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Concrete
{
    public class TestResultRepository : ITestResultRepository
    {
        private TestContext context;

        public TestResultRepository(TestContext context)
        {
            this.context = context;
        }

        public IList<TestResult> GetResults()
        {
            return context.TestResults.ToList();
        }

        public IList<TestResult> GetResultsWithDetails()
        {
            return context.TestResults.Include(x => x.TestResultDetails).ToList();
        }

        public async Task<IList<TestResult>> GetResultsAsync()
        {
            return await context.TestResults.ToListAsync();
        }

        public async Task<IList<TestResult>> GetResultsWithDetailsAsync()
        {
            return await context.TestResults.Include(x => x.TestResultDetails).ToListAsync();
        }

        public TestResult GetResult(int id)
        {
            return context.TestResults.Where(x => x.Id == id).FirstOrDefault();
        }

        public TestResult GetResult(string absoluteUri)
        {
            return context.TestResults.Where(x => x.Authority == absoluteUri).FirstOrDefault();
        }

        public TestResult GetResultWithDetails(int id)
        {
            return context.TestResults.Include(x => x.TestResultDetails).Where(x => x.Id == id).FirstOrDefault();
        }

        public TestResult GetResultWithDetails(string absoluteUri)
        {
            return context.TestResults.Include(x => x.TestResultDetails).Where(x => x.Authority == absoluteUri).FirstOrDefault();
        }

        public async Task<TestResult> GetResultAsync(int id)
        {
            return await context.TestResults.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<TestResult> GetResultAsync(string absoluteUri)
        {
            return await context.TestResults.Where(x => x.Authority == absoluteUri).FirstOrDefaultAsync();
        }

        public async Task<TestResult> GetResultWithDetailsAsync(int id)
        {
            return await context.TestResults.Include(x => x.TestResultDetails).Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<TestResult> GetResultWithDetailsAsync(string absoluteUri)
        {
            return await context.TestResults.Include(x => x.TestResultDetails).Where(x => x.Authority == absoluteUri).FirstOrDefaultAsync();
        }

        public IList<TestResultDetail> GetResultDetails(int resultId)
        {
            return context.TestResultDetails.Include(x => x.TestResult).Where(x => x.TestResult.Id == resultId).ToList();
        }

        public async Task<IList<TestResultDetail>> GetResultDetailsAsync(int resultId)
        {
            return await context.TestResultDetails.Include(x => x.TestResult).Where(x => x.TestResult.Id == resultId).ToListAsync();
        }

        public TestResultDetail GetResultDetail(int resultId, int detailId)
        {
            return context.TestResultDetails.Include(x => x.TestResult)
                .Where(x => x.TestResult.Id == resultId && x.Id == detailId).FirstOrDefault();
        }


        public async Task<TestResultDetail> GetResultDetailAsync(int resultId, int detailId)
        {
            return await context.TestResultDetails.Include(x => x.TestResult)
                .Where(x => x.TestResult.Id == resultId && x.Id == detailId).FirstOrDefaultAsync();
        }

        public void Add(TestResult result)
        {
            context.TestResults.Add(result);
        }

        public void Add(TestResultDetail detail)
        {
            context.TestResultDetails.Add(detail);
        }

        public void AddRange(IEnumerable<TestResult> results)
        {
            context.TestResults.AddRange(results);
        }

        public void AddRange(IEnumerable<TestResultDetail> details)
        {
            context.TestResultDetails.AddRange(details);
        }

        public void Delete(int id)
        {
            var result = GetResult(id);
            context.TestResults.Remove(result);
        }

        public void Delete(string absoluteUri)
        {
            var result = GetResult(absoluteUri);
            context.TestResults.Remove(result);
        }

        public void Update(TestResult result)
        {
            context.Entry(result).State = EntityState.Modified;

            foreach (var detail in result.TestResultDetails)
            {
                context.Entry(detail).State = EntityState.Modified;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }

        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
