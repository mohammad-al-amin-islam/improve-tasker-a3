export function tasksReducer(tasks, action) {
  switch (action.type) {
    case "editTask": {
      const editedData = tasks.filter((t) => t.id !== action.newTask.id);
      return [...editedData, action.newTask];
    }
    case "addTask": {
      return [...tasks, action.newTask];
    }
    case "deleteTask": {
      const filterData = tasks.filter(
        (singleTask) => singleTask.id !== action.task.id
      );
      return [...filterData];
    }
    case "allDelete": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
