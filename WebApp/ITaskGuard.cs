using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp
{
    public interface ITaskGuard
    {
        bool AddTask(string id);
        void RemoveTask(string id);
    }
}
