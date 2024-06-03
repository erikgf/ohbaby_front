import { useLocation, Navigate, Outlet } from "react-router";
import { LayoutMain } from "../LayoutMain/LayoutMain";
import { useAuth } from "../../hooks/useAuth";

export const RequireAuth  = ()=>{
    const { user } = useAuth();
    const location = useLocation();

    return (
        user ? <LayoutMain>
                    <Outlet />
                </LayoutMain>
             : <Navigate  to = "/login" state ={{from: location}} replace></Navigate>
    )
}