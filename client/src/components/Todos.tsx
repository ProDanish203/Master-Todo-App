import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../store/reducers/Todos";
import axios from "axios";
import { toast } from "react-toastify";

export const Todos = () => {

    // @ts-ignore
    const {todos} = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const activeFilter = searchParams.get("todo")  

    let filterData = todos

    if(activeFilter === "active"){
        filterData = todos.filter((todo) => !todo.completed);
    }else if(activeFilter === "completed"){
        filterData = todos.filter((todo) => todo.completed);
    }

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const deleteTodo = async (id) => {
        try{
            const {data} = await axios.delete(`${baseUrl}/api/v2/todo/deleteTodo/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });

            if(data.success){
                dispatch(setTodos(data.todos));
                toast.success("Todo Deleted");
            }

        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const completeTodo = async (id) => {
        try{
            const {data} = await axios.put(`${baseUrl}/api/v2/todo/completeTodo/${id}`,{}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });

            if(data.success){
                dispatch(setTodos(data.todos));
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const editTodo = async (id) => {
        try{
            const {data} = await axios.put(`${baseUrl}/api/v2/todo/editTodo/${id}`,{
            }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });

            if(data.success){
                dispatch(setTodos(data.todos));
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

  return (
    <>
    <div className='flex flex-col justify-center gap-3 max-w-[800px] mt-10 mx-auto w-full'>
        {filterData.map((todo) => (
        <div key={todo._id}  
        className='bg-accent flex items-center justify-between rounded-md px-4 py-4 text-background'>
            <div className='flex items-center gap-2'>
                <input type="checkbox"
                checked={todo.completed} 
                onChange={() => completeTodo(todo._id)}
                id={`${todo._id}-id`} className='w-5 h-5 text-background'/>
                <label htmlFor={`${todo._id}-id`} className={`text-lg ${todo.completed ? "line-thro ": ""}`}>{todo.todo}</label>
                
            </div>
            <div className='flex items-center gap-3'>
                <button className='bg-background text-accent p-2 rounded-md'
                onClick={() => deleteTodo(todo._id)}
                >Delete</button>
                <button className='bg-background text-accent py-2 px-3 rounded-md'
                onClick={() => editTodo(todo._id)}
                >Edit</button>
            </div>
        </div>
        ))}
    </div>
    </>
  )
}
