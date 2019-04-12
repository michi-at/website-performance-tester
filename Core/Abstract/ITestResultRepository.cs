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
        TestResult GetResult(string absoluteUri);
        TestResult GetResultWithDetails(int id);
        TestResult GetResultWithDetails(string absoluteUri);
        Task<TestResult> GetResultAsync(int id);
        Task<TestResult> GetResultAsync(string absoluteUri);
        Task<TestResult> GetResultWithDetailsAsync(int id);
        Task<TestResult> GetResultWithDetailsAsync(string absoluteUri);

        IList<TestResultDetail> GetResultDetails(int testId);
        Task<IList<TestResultDetail>> GetResultDetailsAsync(int testId);

        TestResultDetail GetResultDetail(int resultId, int detailId);
        Task<TestResultDetail> GetResultDetailAsync(int resultId, int detailId);

        void Add(TestResult result);
        void Add(TestResultDetail detail);
        void AddRange(IEnumerable<TestResult> results);
        void AddRange(IEnumerable<TestResultDetail> details);

        void Delete(int id);
        void Delete(string absoluteUri);

        void Update(TestResult result);

        void Save();
        Task SaveAsync();
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
