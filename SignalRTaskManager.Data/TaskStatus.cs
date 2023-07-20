using System.Text.Json.Serialization;

namespace SignalRTaskManager.Data
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TaskStatus
    {
        Available,
        Taken,
        Completed
    }
}
