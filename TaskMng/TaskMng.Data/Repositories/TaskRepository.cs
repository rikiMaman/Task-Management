using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskMng.Core.Models;
using TaskMng.Core.Repositories;

namespace TaskMng.Data.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DataContext _context;

        public TaskRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<TodoTask> GetTasks()
        {
            return _context.Tasks.ToList();
        }

        public TodoTask GetTaskById(int id)
        {
            return _context.Tasks.Find(id);
        }

        public void AddTask(TodoTask task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
        }

        public void UpdateTask(TodoTask task)
        {
            _context.Tasks.Update(task);
            _context.SaveChanges();
        }

        public void DeleteTask(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                _context.SaveChanges();
            }
        }

    }
}
