import React, { useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../components";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/Auth";

export const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  
  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!username) return toast.error("Username is required");
    if(!password) return toast.error("Password is required");

    try{
      setLoading(true);
      const {data}  = await axios.post(`${baseUrl}/api/v1/auth/login`, {
        username, password
      });
      
      // console.log(data);
      if(data.success){
        localStorage.setItem('token', data.token);
        dispatch(setUser(data.user))
        navigate("/");
      }
      
      setLoading(false);
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <>
    <div className="flex items-center justify-center w-full h-full">
      <div>
        <form onSubmit={handleLogin} className="bg-white max-w-[500px] w-full mx-auto min-h-[250px] rounded-md shadow-md px-2 py-4 flex flex-col items-center justify-center">
          <h2 className="text-3xl text-accent font-bold text-center mb-2">Login</h2>
          <div className="mt-5 w-[80%] flex flex-col gap-3">

            <div className="relative">
              <input type="text" placeholder="Username" 
              className="bg-white w-full rounded-md px-4 py-2 focus:border-2 border-2 border-gray-500 focus:border-accent outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative">
              <input type={`${showPass ? "text": "password"}`} placeholder="Password" 
              className="bg-white w-full rounded-md px-4 py-2 focus:border-2 border-2 border-gray-500 focus:border-accent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <i className={`fas ${showPass ? "fa-eye-slash": "fa-eye"} absolute right-3 top-3 text-xl text-accent cursor-pointer`}
              onClick={() => setShowPass(prev => !prev)}
              ></i>
            </div>

            <div>
              <button type="submit"
              className="bg-primary text-background w-full py-2 outline-none rounded-md cursor-pointer my-3 text-lg" 
              >{loading ? <Loader dark={false}/>: "Login"}</button>
            </div>

          </div>
        <span className="text-sm">Don't have an Account? <Link to="/register" className="text-accent font-semibold">Register Now</Link></span>
        </form>

      </div>
    </div>    
    </>
  )
}
