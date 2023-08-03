import './App.css';
import { Router } from "./config/Router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./components";

function App() {
  return (
    <>
    <div className='bg-background min-h-[100vh] px-2'>
    <Header/>
    <ToastContainer/>
    <div className='w-full max-w-[1000px] mx-auto min-h-[80vh] flex flex-col justify-center px-2'>
      <Router/>
    </div>
    </div>
    </>
  );
}

export default App;
