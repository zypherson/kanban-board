import { useState } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  function addTask(column, text) {
    const newTask = {
      id: crypto.randomUUID(),
      text,
    };

    setTasks((prev) => ({
      ...prev,
      [column]: [...prev[column], newTask],
    }));
  }

  return (
    <div className="app">
      <h1>Kanban Board</h1>

      <div className="board">
        {/* TO DO */}
        <div className="column">
          <h2>To Do</h2>

          <button
            onClick={() => {
              const text = prompt("Enter task");
              if (text) addTask("todo", text);
            }}
          >
            + Add Task
          </button>

          {tasks.todo.map((task) => (
            <div key={task.id} className="task">
              {task.text}
            </div>
          ))}
        </div>

        
        <div className="column">
          <h2>In Progress</h2>

          <button
            onClick={() => {
              const text = prompt("Enter task");
              if (text) addTask("inProgress", text);
            }}
          >
            + Add Task
          </button>

          {tasks.inProgress.map((task) => (
            <div key={task.id} className="task">
              {task.text}
            </div>
          ))}
        </div>

        {/* DONE */}
        <div className="column">
          <h2>Done</h2>

          <button
            onClick={() => {
              const text = prompt("Enter task");
              if (text) addTask("done", text);
            }}
          >
            + Add Task
          </button>

          {tasks.done.map((task) => (
            <div key={task.id} className="task">
              {task.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;