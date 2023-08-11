import { useState } from "react";
import CreateTasks from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const App = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16">
        <CreateTasks setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default App;
