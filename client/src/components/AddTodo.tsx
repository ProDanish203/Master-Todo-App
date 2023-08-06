import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "../components";
import { setTodos } from "../store/reducers/Todos";

export const AddTodo = () => {

  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const baseUrl = process.env.REACT_APP_SERVER_URL

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!text) return toast.error("Text is required");
    try{
      setLoading(true)
      // @ts-ignore
      const {data} = await axios.post(`${baseUrl}/api/v2/todo/addTodo`, {
        text
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if(data.success){
        toast.success("Todo added");
        dispatch(setTodos(data.todos));
      }
      setText("");
      setLoading(false)
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto w-full mt-10">
    <div className="w-full text-center flex flex-wrap items-center justify-between gap-3">

        <input type="text" value={text}  onChange={(e) => setText(e.target.value)}
        placeholder="Enter Todo"
        className="px-2 py-2 text-text md:w-[75%] w-full outline-none shadow-lg border-2 border-accent rounded-md"
        />

        <button className="text-background bg-primary px-5 py-2.5 rounded-md md:block md:w-auto w-full">{loading ? <Loader dark={false}/> : "Add todo"}</button>
    </div>
    </form>
    </>
  )
}
