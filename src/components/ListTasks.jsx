import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDrag, useDrop } from "react-dnd";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((item) => item.status === "todo");
    const fprogress = tasks.filter((item) => item.status === "inprogress");
    const fclose = tasks.filter((item) => item.status === "closed");
    setTodos(fTodos);
    setInProgress(fprogress);
    setClosed(fclose);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];
  return (
    <div className="flex gap-16">
      {statuses.map((status, i) => (
        <Section
          key={i}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

const Section = ({ status, tasks, setTasks, inProgress, todos, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => additemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let tasksTomap = todos;
  let bg = "bg-slate-500";
  let text = "todo";
  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksTomap = inProgress;
  }
  if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    tasksTomap = closed;
  }

  const additemToSection = (id) => {
    setTasks((prev) => {
      const mtask = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status };
        }
        return t;
      });
      return mtask;
    });
    toast.success("Task status changed");
  };
  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksTomap.length} />

      {tasksTomap.length > 0 &&
        tasksTomap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center justify-between p-2 h-12 pl-4 rounded-md uppercase text-sm text-white `}
    >
      <div>{text}</div>
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const removeTask = (id) => {
    const newTasks = tasks.filter((ftask) => ftask.id !== id);
    setTasks(newTasks);
    toast.success("Task removed");
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p>{task.name}</p>
      <button
        className="absolute bottom-1 right-1 text-slate-400"
        onClick={() => removeTask(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ListTasks;
