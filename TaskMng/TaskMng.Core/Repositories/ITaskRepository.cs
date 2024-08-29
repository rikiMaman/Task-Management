using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskMng.Core.Models;

namespace TaskMng.Core.Repositories
{
    public interface ITaskRepository
    {
        IEnumerable<TodoTask> GetTasks();
        TodoTask GetTaskById(int id);
        void AddTask(TodoTask task);
        void UpdateTask(TodoTask task);
        void DeleteTask(int id);
    }
}
