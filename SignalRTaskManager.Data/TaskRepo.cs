using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRTaskManager.Data
{
    public class TaskRepo
    {
        private readonly string _connectionString;

        public TaskRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<TaskItem> GetAll()
        {
            var context = new TaskManagerDataContext(_connectionString);
            return context.TaskItems.Include(t => t.User).Where(t => t.Status != TaskStatus.Completed).ToList();
        }

        public void AddTask(TaskItem task)
        {
            var context = new TaskManagerDataContext(_connectionString);
            context.TaskItems.Add(task);
            context.SaveChanges();

        }

        public void SetAccepted(int taskId, int userId)
        {
            var context = new TaskManagerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE TaskItems SET userId = {userId}, status = {TaskStatus.Taken} WHERE Id = {taskId}");
            context.SaveChanges();

        }

        public void SetCompleted(int taskId)
        {
            var context = new TaskManagerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE TaskItems SET status = {TaskStatus.Completed} WHERE Id = {taskId}");
            context.SaveChanges();

        }
    }
}
