import { useEffect } from "react";
import { AddTodo, FilterTodos, Heading, Loader, Todos } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../store/reducers/Todos";
import axios from "axios";

export const Home = () => {
  //@ts-ignore
  const {loading} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  const getTodos = async () => {
    try{
      const {data} = await axios.get(`${baseUrl}/api/v2/todo/getTodos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(data.success){
        dispatch(setTodos(data.todos));
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    getTodos();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    
    {
      loading ? (
      <>
      <div className="w-full flex items-center justify-center">
        <Loader dark={true}/>
      </div>
      </>
      ) : (
      <>
      <div className="">
        <Heading/>
        <FilterTodos/>
        <AddTodo/>
        <Todos/>
      </div>
      </>
      ) 
    }
    </>
  )
}
