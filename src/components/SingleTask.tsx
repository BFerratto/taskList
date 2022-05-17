import React, { useEffect, useRef, useState } from "react";
import { Task } from "./model";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SingleTask: React.FC<Props> = ({ task, tasks, setTasks }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };
  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
    );
    setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <form className="tasks__single" onSubmit={(e) => handleEdit(e, task.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
          className="tasks__single--text-edit"
        />
      ) : task.isDone ? (
        <s className="tasks__single--text">{task.task}</s>
      ) : (
        <span className="tasks__single--text">{task.task}</span>
      )}

      <div>
        {!task.isDone ? (
          <span
            className="icon"
            onClick={() => {
              if (!edit && !task.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <AiFillEdit />
          </span>
        ) : (
          <span className="icon__disabled">
            <AiFillEdit />
          </span>
        )}

        <span className="icon" onClick={() => handleDelete(task.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(task.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTask;
