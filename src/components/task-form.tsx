import React from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Task } from "../types/task";

interface TaskFormProps {
  onAddTask: (task: Omit<Task, "id">) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState<Task["priority"]>("Low");
  const [status, setStatus] = React.useState<Task["status"]>("To-Do");

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    onAddTask({
      title,
      description,
      priority,
      status
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("Low");
    setStatus("To-Do");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          placeholder="Task title"
          value={title}
          onValueChange={setTitle}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          placeholder="Task description"
          value={description}
          onValueChange={setDescription}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <Select
          placeholder="Select priority"
          selectedKeys={[priority]}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className="w-full"
        >
          <SelectItem key="Low" value="Low">Low</SelectItem>
          <SelectItem key="Medium" value="Medium">Medium</SelectItem>
          <SelectItem key="High" value="High">High</SelectItem>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <Select
          placeholder="Select status"
          selectedKeys={[status]}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="w-full"
        >
          <SelectItem key="To-Do" value="To-Do">To-Do</SelectItem>
          <SelectItem key="In Progress" value="In Progress">In Progress</SelectItem>
          <SelectItem key="Done" value="Done">Done</SelectItem>
        </Select>
      </div>
      
      <div>
        <Button 
          color="primary" 
          onPress={handleSubmit}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}