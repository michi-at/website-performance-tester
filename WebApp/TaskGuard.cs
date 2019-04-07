using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp
{
    public class TaskGuard : ITaskGuard
    {
        private HashSet<string> tasks;

        public TaskGuard()
        {
            tasks = new HashSet<string>();
        }

        public bool AddTask(string id)
        {
            lock (tasks)
            {
                if (tasks.Contains(id) || tasks.Count > 2)
                {
                    return false;
                }
                else
                {
                    tasks.Add(id);
                    return true;
                }
            }
        }

        public void RemoveTask(string id)
        {
            lock (tasks)
            {
                tasks.Remove(id);
            }
        }
    }
}