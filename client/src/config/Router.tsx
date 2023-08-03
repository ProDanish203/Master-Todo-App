import { Routes, Route } from "react-router-dom";
import { Login, Register, PageNotfound, Home } from "../pages";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const Router = () => {
  return (
    <>
    <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>
        <Route path="/register" element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
        }/>
        <Route path="/" element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        }/>
        <Route path="*" element={<PageNotfound/>}/>
    </Routes>
    </>
  )
}
