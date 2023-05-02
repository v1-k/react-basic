import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  getToken: () => string | undefined;
};

type TaskData = {
  task_id: string;
  status: string;
  result: string | undefined;
};

const BackgroundTasks = ({ getToken }: Props) => {
  const [tasks, setTasks] = useState<TaskData[]>([]);

  const runTask = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/task/new",
        {},
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      );

      console.log(response);
      const newTask: TaskData = response.data;
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (taskId: string) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/task/result/" + taskId,

        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      );

      console.log(response);
      const updatedTasks = tasks.map((task) => {
        if (task.task_id === taskId) {
          return {
            ...task,
            result: response.data.result,
            status: response.data.status,
          };
        } else {
          return task;
        }
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (getToken()) {
    }
  }, [getToken]);

  return (
    <>
      {
        <>
          <button type="button" className="btn btn-primary" onClick={runTask}>
            Run Task
          </button>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Status</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.task_id}>
                  <td>{task.task_id}</td>
                  <td>{task.status}</td>
                  <td>{task.result}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => getTask(task.task_id)}
                    >
                      Get Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
    </>
  );
};

export default BackgroundTasks;
