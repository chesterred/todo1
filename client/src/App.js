import { useEffect, useState } from 'react';
const API_BASE = "http://localhost:3001";


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [popUpActive, setPopUpActive] = useState(false);

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error:", err));

  }

  const addTodo = async () => {
    const data = await fetch(API_BASE + '/todo/new/', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json());

    setTodos([...todos, data]);
    setNewTodo("");
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + '/todos/delete/' + id, {
      method: "DELETE"
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const completeTodo = async id => {
    const data = await fetch(API_BASE + '/todos/complete/' + id)
      .then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }

      return todo
    }));
  }

  return (
    <div className="todos">
      {todos.map(todo => (
        <div className={"todo" + (todo.complete ? " is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}>
          <div className='todo text'>{todo.text}</div>
          <div className='delete' onClick={() => deleteTodo(todo._id)}>  x</div>
        </div>
      ))}


      <div className="addPopUp" onClick={() => setPopUpActive(true)}>+</div>

      {popUpActive ? (
        <div class="popUp">
          <div className='closePopUp' onClick={() => setPopUpActive(false)}>x</div>
          <div className='content'>
            <input
              type="text"
              onChange={e => setNewTodo(e.target.value)}
              value={newTodo}>

            </input>
            <button onClick={addTodo}>+</button>
          </div>
        </div>

      ) : ""}
    </div>

  );
}

export default App;
