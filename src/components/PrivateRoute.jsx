import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { userService } from "../API/UserService";

function PrivateRoute({ component: Component, roles, ...rest }) {
    const user = userService.userValue;
    return (
            !user ? <Navigate to={{ pathname: '/login', /*state: { from: props.location }*/ }} /> : roles && roles.indexOf(user.role) === -1 ? <Navigate to={{ pathname: '/'}} /> : <Component /*{...props}*/ />
/*            if (!user) {
                // not logged in so redirect to login page with the return url
                <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // check if route is restricted by role
            if (roles && roles.indexOf(user.role) === -1) {
                // role not authorized so redirect to home page
                <Navigate to={{ pathname: '/'}} />
            }

            // authorized so return component
            <Component {...props} />*/
        
    );
}

export default PrivateRoute;