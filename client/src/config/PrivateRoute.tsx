import { Navigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../store/reducers/Auth";
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const PrivateRoute = ({children}) => {

    const dispatch = useDispatch();

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const getUser = async () => {
        try{
            dispatch(setLoading());
            const {data} = await axios.get(`${baseUrl}/api/v1/user/getProfile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(data.success){
                dispatch(setUser(data.user));
            }

            dispatch(setLoading());
        }catch(error){
            console.log(error);
            dispatch(setLoading());
        }
    }
    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 


  if(localStorage.getItem("token")){
    return children;
  }else{
    return <Navigate to="/login"/>
  }
}
