import { useContext, useState } from "react";
import { getRandomColor } from "../utils/color";
import { AddDataContext } from "../context";
import EditTaskModal from "./EditTaskModal";

export default function TaskTable({ task }) {
  const [favourite, setFavourite] = useState(false);
  const {allTasks,setAllTask,dispatch} = useContext(AddDataContext);
  const [showModal, setShowModal] = useState(false);

  
  const handleDelete = () =>{
    const result = window.confirm("Are you sure you want to delete all data?");
    if(result){
        // const filterData = allTasks.filter(singleTask => singleTask.id !== task.id)
        // setAllTask(filterData)
        dispatch({
            type:"deleteTask",
            task:task
        })
    }
  }
  return (
    <>
    {showModal && (
        <EditTaskModal setShowModal={setShowModal} showModal={showModal} task={task} />
      )}
      <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
        <td onClick={() => setFavourite(!favourite)}>
          {favourite === true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="yellow"
              fill="yellow"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
          )}
        </td>
        <td>{task.title}</td>
        <td>
          <div>{task.description}</div>
        </td>
        <td>
          <ul className="flex justify-center gap-1.5 flexWrap">
            {task?.tags.map((tag, index) => {
              const randomColor = getRandomColor();
              const dynamicClass = { backgroundColor: randomColor }; // Adjust the class accordingly

              return (
                <li key={index}>
                  <span
                    className={`inline-block h-5 whitespace-nowrap rounded-[45px]  px-2.5 text-sm capitalize text-[#F4F5F6]`}
                    style={dynamicClass}
                  >
                    {tag}
                  </span>
                </li>
              );
            })}
          </ul>
        </td>
        <td className="text-center">{task.priority}</td>
        <td>
          <div className="flex items-center justify-center space-x-3">
            <button onClick={handleDelete} className="text-red-500">Delete</button>
            <button onClick={() => setShowModal(!showModal)}  className="text-blue-500">Edit</button>
          </div>
        </td>
      </tr>
    </>
  );
}
