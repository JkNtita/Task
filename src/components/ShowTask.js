import React, { useState } from "react";

const ShowTask = ({ tasklist, setTasklist }) => {
  const [editTask, setEditTask] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleEdit = (id) => {
    const taskToEdit = tasklist.find((task) => task.id === id);
    setEditTask(taskToEdit);
    setEditedName(taskToEdit.name);
  };

  const handleSaveEdit = () => {
    if (editedName.trim() === "") {
      // Handle empty name case, if desired
      return;
    }

    const updatedTasklist = tasklist.map((task) =>
      task.id === editTask.id
        ? { ...task, name: editedName, time: getCurrentTime() }
        : task
    );
    setTasklist(updatedTasklist);
    setEditTask(null);
    setEditedName("");
  };

  const handleCancelEdit = () => {
    setEditTask(null);
    setEditedName("");
  };

  const handleDelete = (id) => {
    const updatedTasklist = tasklist.filter((task) => task.id !== id);
    setTasklist(updatedTasklist);
  };

  const getCurrentTime = () => {
    const date = new Date();
    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  };

  return (
    <section className="showTask" id="show">
      <div className="head">
        <div className="title-container">
          <span className="title">Todo</span>
          <span className="count">{tasklist.length}</span>
        </div>
        <button className="clearAll" onClick={() => setTasklist([])}>
          Clear All
        </button>
      </div>
      <ul className="container text-center">
        {tasklist.map((todo) => (
          <li key={todo.id} className="row row-cols-3">
            {editTask && editTask.id === todo.id ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="edit-input"
              />
            ) : (
              <p>
                <span className="name">{todo.name}</span>
                <span className="time">{todo.time}</span>
              </p>
            )}
            <div className="icons-container">
              {editTask && editTask.id === todo.id ? (
                <div className="icons-container">
                  <div className="button-container">
                    <button
                      id="cancel-1"
                      className="cancel-button"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button
                      id="save-1"
                      className="save-button"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="icons-container">
                  <i
                    onClick={() => handleEdit(todo.id)}
                    className="bi bi-pencil-square"
                  ></i>
                  <i
                    onClick={() => handleDelete(todo.id)}
                    className="bi bi-trash"
                  ></i>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShowTask;
