import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { userService } from "../API/UserService";

function PrivateRoute({ component: Component, roles, ...rest }) {
    const user = userService.userValue;
    return (
            !user ? <Navigate to={{ pathname: '/login' }} /> : roles && roles.indexOf(user.role) === -1 ? <Navigate to={{ pathname: '/'}} /> : <Component/>        
    );
}

export default PrivateRoute;