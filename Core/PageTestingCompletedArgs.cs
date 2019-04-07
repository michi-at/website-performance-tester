using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core
{
    public class PageTestingCompletedArgs : EventArgs
    {
        public TestResultDetail ResultDetail { get; }

        public PageTestingCompletedArgs(TestResultDetail resultDetail)
        {
            ResultDetail = resultDetail;
        }
    }
}
