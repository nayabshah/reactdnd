import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTasks = ({ setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (task.name.length < 3) {
      return toast.error("Task must have more then 3 characters");
    }

    if (task.name.length > 100) {
      return toast.error("Task must not be more then 100 characters");
    }
    setTasks((prev) => {
      const list = [...prev, task];
      return list;
    });
    toast.success("Task Created");
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>
  );
};

export default CreateTasks;
