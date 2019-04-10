using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Core.Entities;

namespace WebApp.Models
{
    public class TestResultDTO
    {
        public int Id { get; set; }
        public string Authority { get; set; }
        public int Status { get; set; }
        public DateTime TestDate { get; set; }

        public long MinResponseTime { get; set; }
        public long MaxResponseTime { get; set; }
        public double MeanResponseTime { get; set; }

        public TestResultDTO(TestResult result)
        {
            Id = result.Id;
            Authority = result.Authority;
            Status = result.Status;
            TestDate = result.TestDate;
            MinResponseTime = result.MinResponseTime;
            MaxResponseTime = result.MaxResponseTime;
            MeanResponseTime = result.MeanResponseTime;
        }
    }
}