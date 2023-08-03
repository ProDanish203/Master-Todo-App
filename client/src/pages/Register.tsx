import React, { useState } from "react"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Input } from "../components";
import { dummyUser } from "../assets";
import { ConvertFile } from "../utils/ConvertFile";

export const Register = () => {


  const navigate = useNavigate();

  type userDataTypes = {
    username: string;
    email: string;
    password: string;
    cpass: string;
  }
  
  const [userData, setUserData] = useState<userDataTypes>({
    username: "",
    email: "",
    password: "",
    cpass: "",
  })

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserData({...userData, [name]:value });
  }

  const [picture, setPicture] = useState("")
  const [displayPicture, setDisplayPicture] = useState("")

  const handleFile = async (e) => {
    const convertedImg = await ConvertFile(e.target.files[0])
    // @ts-ignore
    setDisplayPicture(convertedImg)
    setPicture(e.target.files[0])
  }

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const baseUrl = process.env.REACT_APP_SERVER_URL;
  
  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validations
    if(!userData.username) return toast.error("Username is required");
    if(userData.username.includes(" ")) return toast.error("Invalid Username. Remove White spaces");
    if(!userData.email) return toast.error("Email is required");
    if(!userData.password) return toast.error("Password is required");
    if(userData.password.length < 6) return toast.error("Password must be greater than 6 characters");
    if(userData.password.includes(" ")) return toast.error("Password must not contain white spaces");
    if(userData.password !== userData.cpass) return toast.error("Passwords do not match");
    if(!picture) return toast.error("Profile picture is required");

    try{
      setLoading(true);

      const formData = new FormData();
      formData.set('username', userData.username);
      formData.set('email', userData.email);
      formData.set('password', userData.password);
      formData.set('picture', picture);

      const res = await fetch(`${baseUrl}/api/v1/auth/register`, {
        method: "POST",
        body: formData  
      });
      const data = await res.json();
      setLoading(false);

      if(!res.ok) return toast.error(data.message);

      if(data.success){
        toast.success(data.message);
        navigate("/login");
      }

    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
    <div className="flex items-center justify-center w-full h-full">
      <div>
        <form onSubmit={handleLogin} className="bg-white max-w-[500px] w-full mx-auto min-h-[250px] rounded-md shadow-md px-2 py-4 flex flex-col items-center justify-center">
          <h2 className="text-3xl text-accent font-bold text-center mb-2">Register</h2>
          <div className="mt-5 w-[80%] flex flex-col gap-3">

            <div className="relative flex flex-col justify-center items-center mb-2">
              <input type="file" accept=".jpg, .png" className="hidden" onChange={handleFile} id="picture"/>
              <label htmlFor="picture" className="">
                <img src={displayPicture || dummyUser} alt="dummyUser" className="w-20 h-20 rounded-full shadow-sm border-2 object-cover border-accent cursor-pointer"/>
              </label>
            </div>

            <Input type="text" placeholder="Username" name="username" value={userData.username} onChange={handleChange}/>
            <Input type="email" placeholder="Email Address" name="email" value={userData.email} onChange={handleChange}/>

            <div className="relative">
              <input type={`${showPass ? "text": "password"}`} placeholder="Password" 
              className="bg-white w-full rounded-md px-4 py-2 focus:border-2 border-2 border-gray-500 focus:border-accent outline-none"
              value={userData.password}
              name="password"
              onChange={handleChange}
              />
              <i className={`fas ${showPass ? "fa-eye-slash": "fa-eye"} absolute right-3 top-3 text-xl text-accent cursor-pointer`}
              onClick={() => setShowPass(prev => !prev)}
              ></i>
            </div>

            <div className="relative">
              <input type={`${showPass ? "text": "password"}`} placeholder="Confirm Password" 
              className="bg-white w-full rounded-md px-4 py-2 focus:border-2 border-2 border-gray-500 focus:border-accent outline-none"
              value={userData.cpass}
              name="cpass"
              onChange={handleChange}
              />
              <i className={`fas ${showPass ? "fa-eye-slash": "fa-eye"} absolute right-3 top-3 text-xl text-accent cursor-pointer`}
              onClick={() => setShowPass(prev => !prev)}
              ></i>
            </div>

            <div>
              <button type="submit"
              className="bg-primary text-background w-full py-2 outline-none rounded-md cursor-pointer my-3 text-lg" 
              >{loading ? <Loader dark={false}/>: "Register"}</button>
            </div>

          </div>
        <span className="text-sm">Already have an Account? <Link to="/login" className="text-accent font-semibold">Login Now</Link></span>
        </form>

      </div>
    </div>    
    </>
  )
}
