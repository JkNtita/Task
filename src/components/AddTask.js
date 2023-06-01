import React from "react";

const AddTask = ({ tasklist, setTasklist, task, setTask }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    const taskName = e.target.task.value;

    const newTask = {
      id: date.getTime(),
      name: taskName,
      time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
    };

    setTasklist([...tasklist, newTask]);

    e.target.task.value = ""; // Clear the input field after submitting
  };

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <input type="text" name="task" placeholder="Add Task" />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </section>
  );
};

export default AddTask;
