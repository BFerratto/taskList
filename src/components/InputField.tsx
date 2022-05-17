import React, { useRef } from "react";
import "./styles.css";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ task, setTask, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        placeholder="add a task"
        className="input__box"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Add
      </button>
    </form>
  );
};
export default InputField;
