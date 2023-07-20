using Microsoft.AspNetCore.SignalR;
using SignalRTaskManager.Data;

namespace SignalRTaskManager.Web
{
    public class TaskManagerHub : Hub
    {
        private readonly string _dbConnectionString;

        public TaskManagerHub(IConfiguration configuration)
        {
            _dbConnectionString = configuration.GetConnectionString("ConStr");
        }

        public void NewTask(string title)
        {
            var taskRepo = new TaskRepo(_dbConnectionString);
            var task = new TaskItem { Title = title, Status = Data.TaskStatus.Available };
            taskRepo.AddTask(task);
            SendTasks();
        }

        private void SendTasks()
        {
            var taskRepo = new TaskRepo(_dbConnectionString);
            var tasks = taskRepo.GetAll();

            Clients.All.SendAsync("RenderTasks", tasks.Select(t => new
            {
                Id = t.Id,
                Title = t.Title,
                AcceptedBy = t.User != null ? $"{t.User.FirstName} {t.User.LastName}" : null,
                Status = t.Status,
                UserId = t.UserId
            }));
        }


        public void GetAll()
        {
            SendTasks();
        }

        public void SetAccepted(int taskId)
        {
            var guestRepo = new GuestRepo(_dbConnectionString);
            var user = guestRepo.GetByEmail(Context.User.Identity.Name);
            var taskRepo = new TaskRepo(_dbConnectionString);
            taskRepo.SetAccepted(taskId, user.Id);
            SendTasks();
        }

        public void SetCompleted(int taskId)
        {
            var taskRepo = new TaskRepo(_dbConnectionString);
            taskRepo.SetCompleted(taskId);
            SendTasks();
        }

    }

}

