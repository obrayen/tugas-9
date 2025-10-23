import React from "react";
import { TaskForm } from "./components/task-form";
import { TaskBoard } from "./components/task-board";
import { Task } from "./types/task";

export default function App() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: "1",
      title: "Learn TailwindCSS",
      description: "Utility first",
      priority: "Low",
      status: "To-Do"
    },
    {
      id: "2",
      title: "Learn Redux",
      description: "Understand state management with Redux",
      priority: "Medium",
      status: "In Progress"
    },
    {
      id: "3",
      title: "Learn React",
      description: "Study components and hooks",
      priority: "High",
      status: "Done"
    },
    {
      id: "4",
      title: "Learn Next.js",
      description: "",
      priority: "Low",
      status: "To-Do"
    }
  ]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString()
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Task Management Dashboard</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <TaskForm onAddTask={addTask} />
      </div>
      <TaskBoard 
        tasks={tasks} 
        onDeleteTask={deleteTask} 
        onEditTask={editTask}
      />
    </div>
  );
}