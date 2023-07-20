import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";
import { HubConnectionBuilder } from '@microsoft/signalr';


const Home = () => {

    const [taskText, setTaskText] = useState('');
    const [taskItems, setTaskItems] = useState([]);
    const { user } = useAuth();
    const connectionRef = useRef(null);

    useEffect(() => {
        const connectHub = async () => {
            const connection = new HubConnectionBuilder()
                .withUrl("/api/taskManagerHub").build();
            await connection.start();

            connection.on('RenderTasks', tasks => setTaskItems(tasks));

            connection.invoke("GetAll");

            connectionRef.current = connection;
        }

        connectHub();
    }, []);

    const onTaskSubmit = async () => {
        await connectionRef.current.invoke("NewTask", taskText);
        setTaskText('');
    }

    const onAcceptTaskClick = id => {
        connectionRef.current.invoke("setAccepted",  id);
    }

    const onCompleteClick = id => {
        connectionRef.current.invoke("setCompleted", id );
    }


    const getCurrentButton = (task) => {

        console.log(task);

        if (task.status.toUpperCase() === "AVAILABLE") {
            return <button onClick={() => onAcceptTaskClick(task.id)} className="btn btn-dark">Accept Task</button>
        } else if (task.status.toUpperCase() === "TAKEN") {
            if (user.id === task.userId) {
                return <button onClick={() => onCompleteClick(task.id)} className="btn btn-success">Completed</button>
            } else {
                return <button disabled className="btn btn-warning">{task.acceptedBy} in progress</button>
            }
        }

    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div style={{ marginTop: 70 }}>
                <div className="row">
                    <div className="col-md-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Task Title"
                            value={taskText}
                            onChange={(e) => setTaskText(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <button onClick={onTaskSubmit} className="btn btn-primary w-100">Add Task</button>
                    </div>
                </div>
                <table className="table table-hover table-striped table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskItems.map((task) => {
                            return <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>
                                    {getCurrentButton(task)}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )

}

export default Home;
