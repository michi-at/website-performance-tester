using Core.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Abstract
{
    public interface ITestResultRepository
    {
        IList<TestResult> GetResults();
        IList<TestResult> GetResultsWithDetails();
        Task<IList<TestResult>> GetResultsAsync();
        Task<IList<TestResult>> GetResultsWithDetailsAsync();

        TestResult GetResult(int id);
        TestResult GetResult(string authority);
        TestResult GetResultWithDetails(int id);
        TestResult GetResultWithDetails(string authority);
        Task<TestResult> GetResultAsync(int id);
        Task<TestResult> GetResultAsync(string authority);
        Task<TestResult> GetResultWithDetailsAsync(int id);
        Task<TestResult> GetResultWithDetailsAsync(string authority);

        IList<TestResultDetail> GetResultDetails(int testId);
        Task<IList<TestResultDetail>> GetResultDetailsAsync(int testId);

        void Add(TestResult result);

        void Delete(int id);
        void Delete(string authority);

        void Update(TestResult result);

        void Save();
        Task SaveAsync();
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
