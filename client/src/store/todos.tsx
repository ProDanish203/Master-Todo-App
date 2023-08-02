import { ReactNode, useState, createContext, useContext } from "react";

export type TodosProviderProps = {
    children: ReactNode
}

export type Todo = {
    id:string;
    text:string;
    completed:boolean;
    createdAt:Date;
}

export type TodoContextType = {
    todos:Todo[];
    addTodo: (text:string) => void;
    completeTodo: (id:string) => void;
    deleteTodo: (id:string) => void;
}

const TodoContext =  createContext<TodoContextType | null>(null);

export const TodoProvider = ({children}: TodosProviderProps) => {

    const [todos, setTodos] = useState<Todo[]>(() => {
        try{
            const newTodos = localStorage.getItem('todos') || "[]";
            return JSON.parse(newTodos);
        }catch(error){
            return []
        }
    })

    const addTodo = (text:string):void => {
        setTodos((prev) => {
            const newTodo:Todo[] = [
                ...prev,
                {
                    id:Math.random().toString(),
                    text:text,
                    completed:false,
                    createdAt:new Date()
                }
            ]
            localStorage.setItem("todos", JSON.stringify(newTodo));
            return newTodo;
        });
    }

    const completeTodo = (id:string) => {
        setTodos((prev) => {
            const newTodo:Todo[] = prev.map(todo => {
                if(todo.id === id){
                    return {...todo, completed:!todo.completed}
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newTodo));
            return newTodo;
        })
    }

    const deleteTodo = (id:string) => {
        const filterTodo = todos.filter((todo) => todo.id !== id); 
        setTodos(filterTodo)
        localStorage.setItem("todos", JSON.stringify(filterTodo));
    }

    const value = {
        todos,
        addTodo,
        completeTodo,
        deleteTodo,
    }

    return (
        <TodoContext.Provider
        value={value}
        >
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext);