import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import './App.css';
import TaskArea from "./components/TaskArea";
import Footer from "./components/Footer";
import { AddDataContext } from "./context";
import { AllTasks } from "./data/tasks";
import { useReducer, useState } from "react";
import { tasksReducer } from "./reducers/taskReducer";
function App() {
  const data = AllTasks();
  const [allTasks, setAllTask] = useState(data);
  const [state,dispatch] = useReducer(tasksReducer,data)
  return (
    <AddDataContext.Provider value={{allTasks,setAllTask,state,dispatch}}>
      <Navbar />
      <Hero />
      <TaskArea />
      <Footer />
    </AddDataContext.Provider>
  );
}

export default App;
