import { useEffect, useState } from "react"
import "./style.css"
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  // state to manage the list of todos
   const [todos, setTodos] = useState(() => {
    // get todos from local storage
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []
    
    return JSON.parse(localValue)
   });

   // update local storage whenever the todos state changes
   useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
   }, [todos]);

   function addTodo(title) {
    setTodos(currentTodos => {
        return [
          ...currentTodos,
          { id:crypto.randomUUID(), title, completed: false}
        ]
      });
   }

   function toggleTodo(id, completed) {
      setTodos(currentTodos => {
        return currentTodos.map(todo => {
          if (todo.id === id){
            return {...todo, completed};
          }
          return todo;
        })
      })
   }

   function deleteToDo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
   }

  return ( 
    <>
    <NewTodoForm onSubmit={addTodo}/>
    <h1 className="header">Todo List</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteToDo={deleteToDo}/>
    </>
  )
}