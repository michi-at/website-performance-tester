using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class TestResultDetail
    {
        public int Id { get; set; }

        [Required]
        public string Uri { get; set; }

        public long ResponseTime { get; set; }

        public long MinResponseTime { get; set; }
        public long MaxResponseTime { get; set; }
        public double MeanResponseTime { get; set; }

        public TestResult TestResult { get; set; }
    }
}
