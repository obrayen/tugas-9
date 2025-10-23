import React from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input, 
  Textarea, 
  Select, 
  SelectItem 
} from "@heroui/react";
import { Task } from "../types/task";

interface TaskEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (task: Task) => void;
}

export function TaskEditModal({ isOpen, onClose, task, onSave }: TaskEditModalProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState<Task["priority"]>("Low");
  const [status, setStatus] = React.useState<Task["status"]>("To-Do");

  React.useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSave = () => {
    if (!task || !title.trim()) return;
    
    onSave({
      ...task,
      title,
      description,
      priority,
      status
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Task</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    placeholder="Task title"
                    value={title}
                    onValueChange={setTitle}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    placeholder="Task description"
                    value={description}
                    onValueChange={setDescription}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <Select
                    placeholder="Select priority"
                    selectedKeys={[priority]}
                    onChange={(e) => setPriority(e.target.value as Task["priority"])}
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
                  >
                    <SelectItem key="To-Do" value="To-Do">To-Do</SelectItem>
                    <SelectItem key="In Progress" value="In Progress">In Progress</SelectItem>
                    <SelectItem key="Done" value="Done">Done</SelectItem>
                  </Select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}