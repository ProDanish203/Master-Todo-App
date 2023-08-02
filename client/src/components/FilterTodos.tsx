import { Link, useSearchParams } from "react-router-dom";

export const FilterTodos = () => {

    const [searchParams] = useSearchParams();
    const activeFilter = searchParams.get("todo")  

  return (
    <>
    <div className='flex items-center mt-2 gap-3 justify-between text-center font-semibold max-w-[600px] w-full mx-auto bg-accent text-background rounded-md'>
        <Link to="/" className={`${activeFilter == null ? "bg-white text-primary" :""} w-full px-4 py-4`}>
            All
        </Link>
        <Link to="/?todo=active" className={`${activeFilter === "active" ? "bg-white text-primary" :""} w-full px-4 py-4`}>
            Active
        </Link>
        <Link to="/?todo=completed" className={`${activeFilter === "completed" ? "bg-white text-primary" :""} w-full px-4 py-4`}>
            Completed
        </Link>
    </div>
    </>
  )
}
