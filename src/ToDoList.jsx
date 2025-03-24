import React, { useEffect, useState } from "react";

function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

const ToDoList = () => {
  const [tasks, setTasks] = useSessionStorage("tasks", [
    { text: "Eat Breakfast", completed: false },
    { text: "Go to Work", completed: false },
    { text: "Go to the Gym", completed: false },
    { text: "Take a Shower", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    } else {
      alert("Please enter a valid task.");
    }
  }
  function deleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  }

  function editTask(index) {
    setEditIndex(index);
    setEditedTask(tasks[index].text);
  }

  function saveTask(event) {
    event.preventDefault();
    const updatedTasks = tasks.map((task, index) =>
      index === editIndex ? { ...task, text: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditedTask("");
  }

  function toggleTaskCompletion(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">To Do List</h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              type="text"
              value={newTask}
              onChange={handleInputChange}
              placeholder="Enter a new task"
            />
            <button
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-amber-700 hover:bg-amber-200"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>
        <div>
          {tasks.map((task, index) => (
            <div
              key={index}
              className={task.completed ? "completed" : ""}
              style={{ display: "flex", justifyItems: "center" }}
            >
              <div className="flex mb-4 items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
              </div>
              {editIndex === index ? (
                <div className="flex mb-4 items-center">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 ml-4 mr-2 text-grey-darker"
                    type="text"
                    value={editedTask}
                    onChange={(event) => setEditedTask(event.target.value)}
                  />
                  <button
                    onClick={saveTask}
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-green-500 text-green border-green hover:bg-green-100"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex mb-4 items-center">
                  <p className="ml-4 mr-2">{task.text}</p>
                  <button
                    onClick={() => editTask(index)}
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-amber-500 text-green border-green hover:bg-amber-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
