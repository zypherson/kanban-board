/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import "./index.css";


function DraggableTask({ task, column }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
      data: { column },
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="task"
    >
      {task.text}
    </div>
  );
}


function DroppableColumn({ id, title, tasks, addTask }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="column">
      <h2>{title}</h2>

      <button
        onClick={() => {
          const text = prompt("Enter task");
          if (text) addTask(id, text);
        }}
      >
        + Add Task
      </button>

      {tasks.map((task) => (
        <DraggableTask
          key={task.id}
          task={task}
          column={id}
        />
      ))}
    </div>
  );
}

/* =========================
   Main App
========================= */
function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  /* Add Task */
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

  /* Drag Handler */
  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const fromColumn = active.data.current.column;
    const toColumn = over.id;

    if (fromColumn === toColumn) return;

    const task = tasks[fromColumn].find(
      (t) => t.id === active.id
    );

    setTasks((prev) => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter(
        (t) => t.id !== active.id
      ),
      [toColumn]: [...prev[toColumn], task],
    }));
  }

  return (
    <div className="app">
      <h1>Kanban Board</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="board">
          <DroppableColumn
            id="todo"
            title="To Do"
            tasks={tasks.todo}
            addTask={addTask}
          />

          <DroppableColumn
            id="inProgress"
            title="In Progress"
            tasks={tasks.inProgress}
            addTask={addTask}
          />

          <DroppableColumn
            id="done"
            title="Done"
            tasks={tasks.done}
            addTask={addTask}
          />
        </div>
      </DndContext>
    </div>
  );
}

export default App;