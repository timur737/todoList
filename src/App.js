import React, {useEffect} from 'react';
import TodoList from './Todo/TodoList.js'
import Context from './context'
import AddTodo from './Todo/AddTodo.js';
import Loader from './Loader'


function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
   
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=8')
        .then(response => response.json())
        .then(todos => {
          setTimeout(() => {
            setTodos(todos)
            setLoading(false)
          }, 1000)
        })
  }, [])

function toggleTodo(id) {
  setTodos(todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo 
  }))
}
function removeTodo(id){
  setTodos(todos.filter(todo => todo.id !== id))
}
function addTodo(title) {
  setTodos(todos.concat([{
    title,
    id: Date.now(),
    completed: false
  }]))
}
  return (
    <Context.Provider value={{removeTodo}}>
    <div className='wrapper' >
      <h1>Todo List</h1>
      <AddTodo onCreate={addTodo} />
      {loading && <Loader />}
      {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo}/>) : (loading ? null : <p>No Todos!</p>)}
      
    </div>
    </Context.Provider>
  );
}

export default App;
