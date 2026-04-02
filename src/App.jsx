/* eslint-disable no-unused-vars */
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  return (
    <div className="app">
      <h1>Kanban Board</h1>

      <div className="board">
        <div className="column">
          <h2>To Do</h2>
        </div>

        <div className="column">
          <h2>In Progress</h2>
        </div>

        <div className="column">
          <h2>Done</h2>
        </div>
      </div>
    </div>
  );
}

export default App;