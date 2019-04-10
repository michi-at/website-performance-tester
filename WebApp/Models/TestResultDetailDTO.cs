using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Core.Entities;

namespace WebApp.Models
{
    public class TestResultDetailDTO
    {
        public int Id { get; set; }
        public string Uri { get; set; }
        public long ResponseTime { get; set; }
        public long MinResponseTime { get; set; }
        public long MaxResponseTime { get; set; }
        public double MeanResponseTime { get; set; }
        public int TestResultId { get; set; }

        public TestResultDetailDTO(TestResultDetail detail)
        {
            Id = detail.Id;
            Uri = detail.Uri;
            ResponseTime = detail.ResponseTime;
            MinResponseTime = detail.MinResponseTime;
            MaxResponseTime = detail.MaxResponseTime;
            MeanResponseTime = detail.MeanResponseTime;
            TestResultId = detail.TestResult.Id;
        }
    }
}