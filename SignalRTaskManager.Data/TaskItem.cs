using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SignalRTaskManager.Data
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public TaskStatus Status { get; set; }
        public int? UserId { get; set; }

        public User User { get; set; }
    }
}
