import React from "react";
import { Task } from "../types/task";
import { TaskCard } from "./task-card";
import { TaskEditModal } from "./task-edit-modal";

interface TaskBoardProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskBoard({ tasks, onDeleteTask, onEditTask }: TaskBoardProps) {
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedTask: Task) => {
    onEditTask(updatedTask);
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const todoTasks = tasks.filter(task => task.status === "To-Do");
  const inProgressTasks = tasks.filter(task => task.status === "In Progress");
  const doneTasks = tasks.filter(task => task.status === "Done");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h2 className="text-lg font-medium mb-4">To-Do</h2>
        <div className="space-y-4">
          {todoTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={handleEditClick}
              colorClass="bg-green-100"
            />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-4">In Progress</h2>
        <div className="space-y-4">
          {inProgressTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={handleEditClick}
              colorClass="bg-yellow-100"
            />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-4">Done</h2>
        <div className="space-y-4">
          {doneTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={handleEditClick}
              colorClass="bg-red-100"
            />
          ))}
        </div>
      </div>

      <TaskEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleSaveEdit}
      />
    </div>
  );
}