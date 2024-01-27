import { useContext, useState } from "react";
import { AddDataContext } from "../context";

export default function EditTaskModal({ setShowModal, showModal, task }) {
  const { allTasks, setAllTask,state,dispatch } = useContext(AddDataContext);
  const [errorMessages, setErrorMessages] = useState({
    title: "",
    description: "",
    tags: "",
    priority: "",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const tags = e.target.tags.value;
    const priority = e.target.priority.value;

    const newErrorMessages = {
      title: title ? "" : "Title cannot be empty",
      description: description ? "" : "Description cannot be empty",
      tags: tags ? "" : "Tags cannot be empty",
      priority: priority ? "" : "Priority cannot be empty",
    };

    // Check if any field is empty
    if (Object.values(newErrorMessages).some((msg) => msg !== "")) {
      setErrorMessages(newErrorMessages);
      return;
    }

    const newTask = {
      id: task.id,
      title,
      description,
      tags: tags.split(","),
      priority,
    };

    // const editedData = allTasks.filter((t) => t.id !== task.id);
    // setAllTask([...editedData, newTask]);
    dispatch({
        type:"editTask",
        newTask:newTask
    })
    setShowModal(!showModal);
    alert("Task Edited Succesfully");
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[984px] p-4 max-h-[90vh] overflow-auto">
        <form
          onSubmit={handleOnSubmit}
          className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11"
        >
          <div className="flex justify-end p-5 rounded-full ">
            <button
              className="p-1 -ml-1 bg-red-500 rounded-full text-white hover:bg-red-600 focus:outline-none h-12 w-12"
              onClick={() => setShowModal(!showModal)}
            >
              <span className="block">X</span>
            </button>
          </div>
          <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
            Edit Task Here
          </h2>

          <div className="space-y-9 text-white lg:space-y-10">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="title">Title</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="title"
                id="title"
                defaultValue={task.title}
              />
              {errorMessages.title && (
                <div className="mt-2 text-red-500">{errorMessages.title}</div>
              )}
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                type="text"
                name="description"
                id="description"
                defaultValue={task.description}
              ></textarea>
              {errorMessages.description && (
                <div className="mt-2 text-red-500">
                  {errorMessages.description}
                </div>
              )}
            </div>

            <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="tags">Tags</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  name="tags"
                  id="tags"
                  defaultValue={task.tags}
                />
                {errorMessages.tags && (
                  <div className="mt-2 text-red-500">{errorMessages.tags}</div>
                )}
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="priority">Priority</label>
                <select
                  className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                  name="priority"
                  id="priority"
                  defaultValue={task.priority}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errorMessages.priority && (
                  <div className="mt-2 text-red-500">
                    {errorMessages.priority}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center lg:mt-20">
            <button
              type="submit"
              className="ml-5 rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Edit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
