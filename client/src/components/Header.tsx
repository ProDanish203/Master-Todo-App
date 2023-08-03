import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../store/reducers/Auth";

export const Header = () => {

    // @ts-ignore
    const {user} = useSelector(state => state.auth);
    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(setUser(null));
        localStorage.removeItem('token');
        navigate("/login");
    }

  return (
    <>
    <header className="flex items-center justify-between gap-2 px-4 py-3 mb-5 shadow-md">

        <div>
            <h2 className="text-3xl font-bold cursor-pointer text-text">Todo App</h2>
        </div>

        <nav className="flex items-center gap-2">
            {user ? (
            <>
            <Link to="/profile">
                <img src={`${baseUrl}/${user?.picture}`} alt="profile-img" className="rounded-full w-12 h-12 object-cover"/>
            </Link>    
            <button className="bg-primary px-3 py-2 cursor-pointer shadow-sm rounded-md text-background" onClick={logout}>Logout</button>
            </>
            ) : (
            <>
            <Link to="/login">
                <button className="bg-primary px-3 py-2 cursor-pointer shadow-sm rounded-md text-background">Login</button>
            </Link>

            <Link to="/register">
                <button className="bg-primary px-3 py-2 cursor-pointer shadow-sm rounded-md text-background">Signup</button>
            </Link>  
            </>
            )}
        </nav>

    </header>
    </>
  )
}
