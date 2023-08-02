import React from 'react'
import { useTodo } from '../store/todos'
import { useSearchParams } from "react-router-dom";

export const Todos = () => {

    const {todos, completeTodo, deleteTodo, 
        // editTodo
    } = useTodo();
    const [searchParams] = useSearchParams();
    const activeFilter = searchParams.get("todo")  

    let filterData = todos

    if(activeFilter === "active"){
        filterData = todos.filter((todo) => !todo.completed);
    }else if(activeFilter === "completed"){
        filterData = todos.filter((todo) => todo.completed);
    }

  return (
    <>
    <div className='flex flex-col justify-center gap-3 max-w-[800px] mt-10 mx-auto w-full'>
        {filterData.map((todo) => (
        <div key={todo.id}  
        className='bg-accent flex items-center justify-between rounded-md px-4 py-4 text-background'>
            <div className='flex items-center gap-2'>
                <input type="checkbox"
                checked={todo.completed} 
                onChange={() => completeTodo(todo.id)}
                id={`${todo.id}-id`} className='w-5 h-5 text-background'/>
                <label htmlFor={`${todo.id}-id`} className={`text-lg ${todo.completed ? "line-thro ": ""}`}>{todo.text}</label>
                
            </div>
            <div className='flex items-center gap-3'>
                <button className='bg-background text-accent p-2 rounded-md'
                onClick={() => deleteTodo(todo.id)}
                >Delete</button>
                {/* <button className='bg-background text-accent py-2 px-3 rounded-md'
                onClick={() => editTodo(todo.id)}
                >Edit</button> */}
            </div>
        </div>
        ))}
    </div>
    </>
  )
}
