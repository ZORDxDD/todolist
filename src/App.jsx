import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container bg-purple-200 min-h-screen w-1/2 absolute left-1/4 my-4 rounded-lg p-4">
        <div className="topic py-4">
          <h2 className="text-2xl font-bold my-2">Add a TODO TASK</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your todos for the day"
              className="py-1.5 px-2 flex w-1/2 rounded-lg"
            />
            <button
              onClick={handleAdd}
              className="text-white bg-violet-800 hover:bg-violet-950 py-1.5 px-3 mx-2 rounded-lg cursor-pointer"
              disabled={todo.length < 3}
            >
              Save
            </button>
          </div>
        </div>

        <h2 className="mx-4 font-bold text-2xl">Your Todos</h2>

        <div className="todos mx-4 mt-4 min-h-[50vh]">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            id=""
          />{" "}
          <strong className="text-xl">Show Finished</strong>

          {todos.length === 0 && <div className="m-5">No todos to display</div>}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex flex-col my-3 p-2">
                  <div className="flex items-start gap-2 py-2 ">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className="w-full">
                      <div className={item.isCompleted ? "line-through break-words" : "break-words"}>
                        {item.todo}
                      </div>
                    </div>
                  </div>

                  <div className="buttons flex justify-end gap-2 mt-2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="text-white bg-green-800 hover:bg-green-950 py-1.5 px-3 rounded-lg cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="text-white bg-red-800 hover:bg-red-950 py-1.5 px-3 rounded-lg cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
