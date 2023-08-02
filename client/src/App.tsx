import './App.css';
import { FilterTodos } from './components/FilterTodos'
import { Heading } from './components/Heading'
import { Todos } from './components/Todos'
import { AddTodo } from "./components/AddTodo";

function App() {
  return (
    <>
    <div className='bg-background min-h-[100vh] px-2'>
    <div className='w-full max-w-[1000px] mx-auto min-h-[60vh] flex flex-col justify-center px-2'>
      <Heading/>
      <FilterTodos/>
      <AddTodo/>
      <Todos/>
    </div>
    </div>
    </>
  );
}

export default App;
