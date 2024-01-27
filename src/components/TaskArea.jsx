import { useContext, useState } from "react";
import TaskTable from "./TaskTable";
import AddTaskModal from "./AddTaskModal";
import { AddDataContext } from "../context";

export default function TaskArea() {
  const { allTasks, setAllTask, state,dispatch } = useContext(AddDataContext);
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [allFilterTasks, setAllFilterTask] = useState(null);

  const handleOnChange = (e) => {
    const getSearch = e.target.value;
    setSearchData(getSearch);
    const filterData = allTasks.filter((task) =>
      task.title.toLowerCase().includes(getSearch.toLowerCase())
    );
    setAllFilterTask(filterData);
  };

  const handleAllDelete = () => {
    const result = window.confirm("Are you sure you want to delete all data?");
    if (result) {
        dispatch({
            type:"allDelete",
        })
    }
  };

  return (
    <>
      {showModal && (
        <AddTaskModal setShowModal={setShowModal} showModal={showModal} />
      )}
      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between sm:flex">
              <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
              <div className="flex items-center space-x-5">
                <form>
                  <div className="flex">
                    <div className="relative overflow-hidden roundedLg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                      <input
                        type="search"
                        id="search-dropdown"
                        className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
                        placeholder="Search Task"
                        required
                        onChange={handleOnChange}
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-0 h-full rounded-eLg text-white md:right-4"
                      >
                        <svg
                          className="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                        <span className="sr-only">Search</span>
                      </button>
                    </div>
                  </div>
                </form>
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                >
                  Add Task
                </button>
                <button
                  onClick={handleAllDelete}
                  className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
                >
                  Delete All
                </button>
              </div>
            </div>
            <div className="overflow-auto">
              <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                  <tr>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                      Title
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                      Description
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                      Tags
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                      Priority
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchData === "" ? (
                    state.length === 0 ? (
                      <tr>
                        <td>Task List is empty</td>
                      </tr>
                    ) : (
                      state
                        ?.sort((a, b) => a.id - b.id)
                        .map((task) => <TaskTable key={task.id} task={task} />)
                    )
                  ) : allFilterTasks?.length === 0 ? (
                    <tr>
                      <td>Not found</td>
                    </tr>
                  ) : (
                    allFilterTasks
                      ?.sort((a, b) => a.id - b.id)
                      .map((task) => <TaskTable key={task.id} task={task} />)
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
