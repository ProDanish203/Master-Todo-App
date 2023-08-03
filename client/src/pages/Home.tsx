import { AddTodo, FilterTodos, Heading, Loader, Todos } from "../components";
import { useSelector } from "react-redux";

export const Home = () => {
  //@ts-ignore
  const {loading} = useSelector(state => state.auth)

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
