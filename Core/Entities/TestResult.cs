using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class TestResult
    {
        public int Id { get; set; }

        [Required]
        public string Authority { get; set; }
        public int Status { get; set; }
        public DateTime TestDate { get; set; }

        public long MinResponseTime { get; set; }
        public long MaxResponseTime { get; set; }
        public double MeanResponseTime { get; set; }

        public IList<TestResultDetail> TestResultDetails { get; set; }
    }
}
