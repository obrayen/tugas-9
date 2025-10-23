import React from "react";
import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  colorClass: string;
}

export function TaskCard({ task, onDelete, onEdit, colorClass }: TaskCardProps) {
  return (
    <div className={`p-4 rounded-lg ${colorClass}`}>
      <h3 className="text-lg font-medium">{task.title}</h3>
      {task.description && <p className="text-sm mt-1">{task.description}</p>}
      <p className="text-sm mt-2">Priority: {task.priority}</p>
      <div className="flex mt-3 space-x-4">
        <button 
          className="text-red-500 text-sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
        <button 
          className="text-blue-500 text-sm"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}